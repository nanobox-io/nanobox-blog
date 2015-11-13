---
title: Nanopack - A New Vision for Automated Infrastructure
date: 2015-11-13 20:03 UTC
author: tyler
tags: Open Source
---

Today we’d like to introduce [Nanopack](http://nanopack.io), our vision for a fully-automated, API-driven infrastructure. Five years ago, we launched [Pagoda Box](https://pagodabox.io) with a mission to empower application developers by eliminating systems administration. The challenge for both Pagoda Box and Nanobox is that we need the ability to manipulate, configure, and build infrastructure in real-time via remote APIs.

## The Problem in the Wild
Let me provide a real scenario we dealt with early on with Pagoda Box that clearly illustrates the problem: Pagoda Box allows a developer to add SSL/TLS encryption to their app from the app dashboard. After the cert is created, an Nginx web server needed to be re-configured for the app. This process entailed SSH’ing into the web server machines, updating the configuration file, then reloading the nginx process. While this process was automated, it became clear that it was brittle, unstable, and would not scale. 

As we were reaching critical mass and struggling to deal with scale and growth, we took a step back to re-assess. We looked at this and other processes then realized the solution was clear: we needed to develop and manage our infrastructure like we do our apps; with direct API-access at the source for real-time configuration. Instead of logging into machines, updating config files, and reloading services, we needed to expose the configuration of these services via an API. Instead of using nginx for SSL termination, we built a lightweight, API-driven SSL terminator that enabled us to apply a TLS/SSL cert in real-time, with a single API call.

## Sharing Our Philosophy & Our Projects
Over the years, this pattern became our guiding philosophy. Today, we’d like to share that philosophy, as well as all of our internal components and services for nanobox cloud.

<a href="http://nanopack.io" style="max-width: 10em; margin: 0 auto; display: block;">
  <img src="/images/nanopack-logo.svg">
</a> 

Nanopack is a collection of open source projects that embrace the Unix philosophy of a singular purpose. The collective result is left to the imagination of the consumer, likely dictated by the needs of a project. We value collaboration and recognize there are other organizations and efforts that are inline with our vision. 

We need your help to realize this vision. If you’re a systems administrator or a devops person, we need your assistance to identify scenarios and vet potential solutions. If you’re a programmer, we have lots of code that needs to be written. We need help documenting and spreading the word. Get more inforamtion about Nanopack at [nanopack.io](http://nanopack.io) and get in touch on [Github](https://github.com/nanopack).


