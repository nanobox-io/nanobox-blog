---
title: Holiday Gifts - New Features
date: 2015-12-18 16:57 UTC
author: tyler
tags: Updates, Features
---

As we prepare for the holidays, we’re excited to rollout a series of new features and enhancements. The past few weeks have been very good to Nanobox, and we’re anxiously nearing a beta release of Nanobox Desktop. We have a lot of functionality to cover, so let’s get right to it...

## Zero Config Dev Mode

### The Problem

The 'dev' container environment is auto-configured and the source code from the host is mounted into the dev container. As part of the environment preparation, engines may configure required services like Redis or Postgres. By design, nanobox will not alter the original source code on the host in any way. The usability challenge here is that, as a result of nanobox being nonintrusive, 'nanobox dev' can't auto-generate application configuration. If nanobox were to modify or generate application configuration files, those changes would be pushed back onto the original source, thus violating our strict nonintrusive contract.

Essentially, an application using nanobox in dev mode will require the developer to modify the configuration manually in order to connect to the auto-generated services within nanobox. Not ideal.

### The Solution

The solution is to allow the engine to generate the configuration files as it would in run mode. Then when the dev container is created, those generated configuration files are bind mounted on top of the original configuration files. This allows the application within the dev container to connect to the auto-generated services, without requiring manual intervention or modifying the source files. 

This behavior provides engine developers with powerful leverage to create zero-configuration development environments. In the coming months, users can expect to run `nanobox dev` in their application source directory and have a fully-configured application without any modifications to the actual source code.

This was a substantial, coordinated effort across multiple projects of various specialties contributed by [Greg (glinton)](https://github.com/glinton), [Lyon (lyondhill)](https://github.com/lyondhill), [Domino (sdomino)](https://github.com/sdomino), and [myself (tylerflint)](https://github.com/tylerflint). 

## Custom Dev Working Directory

[Lyon](https://github.com/lyondhill) has provided an enhancement to the `nanobox dev` workflow by giving you the ability to specify a custom working directory the dev console session drops you into. This can be set by the application developer for a specific app, or transparently via the engine and is extremely helpful for languages like [go](https://golang.org/), which require the build process to occur within a specific directory. 

The configuration happens within the ‘dev’ node of the Boxfile, like this:

```yaml
dev:
  working_dir: '/code/some/nested/dir'
```

## TCP, UDP, and HTTP Converge

As the modern web evolves into mobile and IoT, applications are evolving away from the typical http request/response cycle. In fact, we’re seeing that many applications can handle multiple types of services within the same process. [Nanopack](http://nanopack.io/) projects are examples of this; wherein the majority of these projects offer a tcp or udp service, but expose an http api for management. 

With ‘nanobox run’, which is the [Nanobox Cloud](https://nanobox.io/cloud/) emulator, you can now natively support multiple services within the same process. Not only is this helpful when running your app locally within [Desktop](https://desktop.nanobox.io/), but also in how you will run your app in production with [Cloud](https://nanobox.io/cloud/).

Within the Boxfile, you can specify ports for each web service. To accomplish this functionality, port definitions have been expanded to support the protocol. Here’s an example of an app’s web service that depends on multiple protocols:

```yaml
web1:
  ports:
    - tcp:9000
    - http:80:8080
    - https:443:8080
```

As shown in this example, a port declaration follows this format: `<protocol>:<external port>:<internal port>`

The external port is the publicly accessible port clients use. The internal port is the port your application listens on within the container. Again, special thanks to [Lyon](https://github.com/lyondhill).

## Stand-Alone Updater

[Domino](https://github.com/sdomino) has been hard at work on a stand-alone updater binary. Unsuspecting bugs are still lurking, hard as we try. We will get them all eventually, but in the meantime, we’ve decided a stand-alone updater is prudent, as often times one of these unforeseen issues can (and have) impeded the ability to update the binary to a version where the bug is fixed. The update process will look the same, however, behind the scenes, an isolated child process will be launched to handle the update procedure. This will also bring auto-update capabilities to Windows!

## Proxy Support

[Greg](https://github.com/glinton) has brought proxy support to Nanobox Desktop, thanks to the insights and help of [Matt](https://github.com/mattn) (the creator of [Gom](https://github.com/mattn/gom)). The beauty of this implementation is that if your host is configured to use a proxy, Nanobox Desktop will detect it and configure both Docker and the nanobox daemon inside the VM to use the same proxy configuration.

## Build Image Enhancements

Finally, [I’ve](https://github.com/tylerflint) added a series of enhancements and bug fixes to the build process. Thanks in part to [Jason](https://github.com/jason-riddle), who discovered some Python environment inconsistencies, we were able to identify some foundational changes that provide a seamless dev workflow for Python and other virtual environments. 

## Happy Holidays
We’ve seen lots of movement in a short period of time, thanks to the [dedicated team](https://github.com/orgs/nanobox-io/people) and to all those who have volunteered time and code to this effort. Stay tuned for some exciting announcements at the beginning of the year and a clear roadmap for [Cloud](https://nanobox.io/cloud/) and [engines](https://engines.nanobox.io/).

Happy holidays!
