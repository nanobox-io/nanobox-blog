---
title: New Feature&#58; Engine Overlays
date: 2015-11-06 19:01 UTC
author: scott
tags: Features
---

Last week we set out to tackle the issue of importing functionality from one engine into another. The need for this feature became apparent as nearly every engine needed the option to run bower for front-end dependencies. Bower is an npm module and requires a node.js runtime. Although a node.js engine already exists that conditionally installs node, then runs a `bower install` if a bower.json exists, we found ourselves duplicating this code and functionality across engines. Other scenarios such as a WordPress engine needing to import the existing logic from the [php engine](https://engines.nanobox.io/releases/9cfde7f2-44e8-45fe-80f7-800d6acf2b4b) made the problem abundantly clear:

**TLDR:** We needed a simple way to combine functionality from different engines.

## Stacking Engines

Having spent much of our time in the past 3 years within the Illumos and SmartOS communities, we’ve seen first-hand how well overlaying files can work in a shell/config-centric world. Illumos uses this pattern as a way to create distributions, overriding core functionality and also extending behavior. 

The idea is simple: Stack the contents of an engine on top of another engine. One by one, the contents of the overlaid engines are layered on top of the previous engine. This means that new files are added and files with the same name are replaced. Though simple, the approach provides great flexibility.

## Example

To see how this feature can be put to use, let’s take a look at the [WordPress engine](https://engines.nanobox.io/releases/67f616c1-91f1-4dae-83fc-b81b8fcf9e61):

First, the WordPress engine specifies in the Enginefile that it wants to overlay the php engine:

```yaml
overlays:
  - php
```

The full Enginefile can be referenced here:   
https://github.com/nanobox-io/nanobox-engine-wordpress/blob/master/Enginefile

Now, the WordPress engine can source the bash scripts provided by the php engine:   
https://github.com/nanobox-io/nanobox-engine-wordpress/blob/master/lib/wordpress.sh#L5

Finally, the WordPress ‘prepare’ bin script can now call functions provided by the php engine:   
https://github.com/nanobox-io/nanobox-engine-wordpress/blob/master/bin/prepare#L14-L24


## Making Engine Development Faster

Engine overlays allow engine developers to include already established functionality into their own engines without having to duplicate code or fork existing engines. Framework maintainers can overlay a language-generic engine to lay the foundation for their application and only worry about functionality specific to their framework. In short, overlays keep you from having to do things that have already been done.