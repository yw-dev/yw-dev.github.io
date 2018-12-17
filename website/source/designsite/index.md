---
title: 设计站
date: 
type: "designsite"
layout: "designsite"
comments: false
---


<header class="header">
  <div class="banner"></div>
  <div class="Overlay Page-navigation Overlay-top">
    <div class="Overlay-main"></div>
    <div class="Overlay-content">
      <nav class="main-nav">
          <a class="main-nav-logo" href="<%- url_for(theme.menu[0]) %>"><i class="fa fa-<%- theme.custom_logo.image %> fa-2x"></i></a>
          <div class="header-items">
              <a class="main-nav-link" href="<%- url_for(theme.menu[i]) %>">
                <div class="main-nav-link-icon">
                  <i class="fa fa-<%- theme.menu_icons[i] %> fa-1x"></i>
                </div>
              </a>
          </div>
      </nav>
    </div>
  </div>
</header>