---
title: New Feature&#58; Live Reloading
date: 2015-12-11 22:20 UTC
author: tyler
tags: Features
---

These days, almost every modern web framework is embracing the ability to live reload the browser when a source file is modified. It’s a cool trend; one we happen to use daily on most of our web applications. Over the past 6 months we’ve been obsessed with figuring out how to develop an application using livereload in dev mode on nanobox. In the past couple of weeks, thanks in large part to [Lyon](https://github.com/lyondhill), we’ve made some great progress towards this goal and today we’re excited to release and demo this functionality.

**TLDR:** Livereload works on nanobox! Check it out in the demo [below](#video-demo). 

## The Problem

Generally, livereload (outside of nanobox) works by subscribing to an I/O event notification layer provided by the operating system kernel. The livereload library “watches” files and directories for changes, then waits for the event notification from the kernel indicating a file or directory has been modified. When a file is modified, certain hooks run which may re-compile code or generate static assets accordingly. The livereload server then informs the browser, connected over a websocket, that a file has been modified and the browser refreshes.

With nanobox, your application runs inside of a virtual machine (VM), and the source code is mounted inside. Livereload functionality breaks because the livereload server subscribes to events on the OS of the guest VM, but changes to the source code are made on the OS of the host machine. While the changes to the files are reflected inside the VM via the mount, the change event is triggered on the host OS, not on the guest OS. Thus, changes are not broadcast and the livereload server never triggers a re-compile and browser refresh.

## The Solution

Our initial instinct, after having spent the past year in kernel development on illumos, was to try to modify the behavior of NFS and the VirtualBox fs driver behavior to replicate events from the host on the client OS. This effort didn’t make it far, as it proved to be a major undertaking without any guarantee that our work would be accepted by the vendors who maintain these projects. 

Instead, we took a step back and realized we could accomplish the goal in a much less obtrusive manner. When you run `nanobox dev`, a watcher thread (go routine if you want to be technical about it) subscribes to the kernel event notification layer and waits to be informed of changes to the source code. When a change to a file or directory is triggered, the watcher thread connects to the nanobox-server daemon inside the VM and relays the event. The nanobox-server daemon then touches the file inside the VM, which ultimately forces a propagation of the event to the livereload server. 

It took a lot of iterations to flesh out the bugs and required a major refactor to handle tens of thousands of file change events per second. We’re excited to say that it’s now complete, stable, and working quite well! Your application doesn’t need to change or do anything special. The entire I/O event propagation and relay system is completely transparent to the application and the nanobox user.

I created a short demo that demonstrates this process. Enjoy!

<div class="video" id="video-demo">
  <iframe width="560" height="315" src="https://www.youtube.com/embed/Donrr7YXkak?rel=0&amp;showinfo=0" frameborder="0" allowfullscreen></iframe>
</div>

## Contributor Love
Special thanks to all those who contributed to Nanobox & Nanopack projects this week. If we missed you, let us know and we'll be sure to get you in next week.

**[Flat](https://github.com/Flat)**  
- Fixed some typos in engine publishing  
- Made the update process more stable  
- Helped work through the windows update process  
  
**[alytvynov](https://github.com/alytvynov)**  
- Fixed scribble usage on Yoke  
  
**[mattn](https://github.com/mattn)**  
- Helped us identify and understand proxy situations  
  
**Walther Diechmann**  
- Helped identify LAN networking issues  
- Spurred a discussion that produced a plausible feature for bridge networking  
  
**[Andrew-College](https://github.com/Andrew-College)**  
- Identified a missing shared library in Oracle Java package  
  
**[fnmunhoz](https://github.com/fnmunhoz)**  
- Identified incorrect ruby_runtime cofigurations and helped confirm a fix  
  
**[ehsanminachi](https://github.com/ehsanminachi)**  
- Helped identify specific yoke scenarios for documentation  
  
**[imkheong](https://github.com/imkheong)**  
- Working to identify windows-specific Vagrantfile generation syntax errors  