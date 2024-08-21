---
date: 2024-08-19
updated: 2024-08-19
order: 10
---
## 데이터베이스 선택
데이터베이스는 개인 DB서버에 구축해놓은 postgresql을 사용한다.

## 패키지 선택
nodejs의 postgresql 패키지는 **node-postgres**와 **pg-promise**가 있다.
pg-promise는 내부적으로 node-postgres를 사용하며, Promise 객체를 활용할 수 있으므로 비동기 처리시 이점이 있어 pg-promise를 사용한다

```sh
pnpm i pg-promise
```

## 주요 파일
### DBConnection.ts  
데이터베이스와 커넥션을 맺는 역할을 한다.

cn 변수의 max 속성을 보면 커넥션의 갯수를 지정할 수 있는 것 같다. 추측하건데 커넥션 풀을 구축하지는 않아도 될 것으로 판단되나. 확인은 필요하다.

SELECT 쿼리 수행 완료 후 받아오는 값을 스네이크 케이스로 그대로 받아오기에 카멜 케이스로 바꿔주는 로직을 콜백에 추가해주어야 해서 `camelizeColumns`  함수를 추가 후 `receive` 콜백함수에 추가하였다.

```ts
import 'server-only';

import pgPromise from 'pg-promise';

const initOptions = {
  capSQL: true,
  connect(e:any) {
    const cp = e.client.connectionParameters;
    console.log('Connected to database:', cp.database);
  },
  query(e:any) {
    console.log('QUERY:', e.query);
  },
  receive(e:any) {
    camelizeColumns(e.data);
  },
  disconnect(e:any) {
    const cp = e.client.connectionParameters;
    console.log('Disconnecting from database:', cp.database);
  }
};

const pgp = pgPromise(initOptions);

const cn = {
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  database: process.env.POSTGRES_DATABASE,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  max: 10 // use up to 10 connections
  // "types" - in case you want to set custom type parsers on the pool level
};

const conn = pgp(cn);

function camelizeColumns(data:any) {
  const tmp = data[0];
  for (const prop in tmp) {
    const camel = pgp.utils.camelize(prop);
    if (!(camel in tmp)) {
        for (let i = 0; i < data.length; i++) {
            const d = data[i];
            d[camel] = d[prop];
            delete d[prop];
        }
    }
  }
}

export default conn;
```

### QueryHelper.ts
쿼리를 실행하는 역할을 한다. 

nodejs에는 mybatis와 같은 다이나믹쿼리를 지원하지 않아 preparestatement 형태로 파라미터를 전달해야하는데, 불편해서 직접 구현하였다. 현재는 가장 많이 쓰는 string, number에만 대응하고 그 외는 대응하지 않는다. 필요 시 하나씩 추가 할 예정이다.

추가로 원활한 페이징을 위해 offset과 limit 파라미터가 존재하면 쿼리를 append처리 하였다. 추후 페이징 처리를 구현할 때 변경될 여지가 있다.

현재까지 구현된건 selectOne, selectList가 있으며, selectList 실행 시 총 count를 집계하는 쿼리를 같이 실행하게 하였다. 추후 mybatis의 if문 같은 기능도 추가할 예정이다.

```ts
import conn from '@/lib/database/DBConnection';

export default class QueryHelper {
  /**
   * When no rows are returned, it resolves with null.
   * When 1 row is returned, it resolves with that row as a single object.
   * When multiple rows are returned, it rejects with QueryResultError:
   * .message = Multiple rows were not expected.
   * .code = queryResultErrorCode.multiple
   * Resolves with the new value, if transformation callback cb was specified.
   */
  public static async selectOne(query:string, params:object = {}): Promise<
    any
  > {
    let data:any = {};

    query = this.replaceParams(query, params);

    data = await conn.oneOrNone(query)
    .catch(error => {throw error;});
    return data;
  }
  
  /**
   * When no rows are returned, it resolves with an empty array.
   * When 1 or more rows are returned, it resolves with the array of rows.
   */
  public static async selectList(query:string, params:object = {})
  : Promise<{
    datas: any[];
    totalCount: number;
  }> {
    let datas: any[] = [];

    let count = await this.selectTotalCount(query);
    
    if(params.hasOwnProperty("limit")){
      query += limit;
    }

    if(params.hasOwnProperty("offset")){
      query += offset;
    }

    query = this.replaceParams(query, params);

    datas = await conn.manyOrNone(query)
    .catch(error => {throw error;});

    return {
      datas: datas,
      totalCount: count
    };
  }

  private static async selectTotalCount(query:string)
  : Promise<number>{
    let data = await this.selectOne(`SELECT COUNT(1) FROM (${query})`)
    return Number(data.count);
  }

  private static replaceParams(query:string, params:object = {})
  : string{
    let queryParams = query.match(/\#.+?\}/g);
    Object.entries(params).forEach((k)=>{
      queryParams?.forEach(s=>{
            if(s.includes(k[0])){
              let param:any;
              switch(typeof k[1]){
                case 'string':
                  param = ''.concat('\'',k[1],'\'');
                case 'number':
                default:
                  param = k[1];
                  break;
              }
              query = query.replaceAll(s, param);
            }
        })
    })
    return query;
  }
}

const limit = `
LIMIT #{limit}
`;

const offset = `
OFFSET #{offset}
`;
```