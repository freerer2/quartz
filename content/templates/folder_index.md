---
title: <% tp.file.folder() %>
aliases:
  - <% tp.file.folder() %>
order: 99999
---
<% await tp.file.rename("index") %>
![[<% tp.file.folder(true) %>/<% tp.file.folder() %>]]

<%* await tp.file.create_new(tp.file.find_tfile("Waypoint"), tp.file.folder()) %>