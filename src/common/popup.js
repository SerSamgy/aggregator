// ==UserScript==
// @name Aggregator
// @include http://*
// @include https://*
// /==UserScript==

KangoAPI.onReady(function() {
	// kango.browser.tabs.getAll(function(tabs) {
        kango.browser.windows.getCurrent(function(win) {
                win.getTabs(function(tabs) {
                        // var ul = document.createElement("ul");
                        for(var i = 0; i < tabs.length; i++) {
                                var div = document.createElement('div');
                                div.setAttribute('id', i);
                                var input = document.createElement('input');
                                input.setAttribute('type', 'checkbox');
                                input.setAttribute('id', tabs[i].getId());
                                var span = document.createElement('span');
                                span.textContent = tabs[i].getTitle();
                                div.appendChild(input);
                                div.appendChild(span);
                                document.body.appendChild(div);
                        	// var li = document.createElement("li");
                        	// li.textContent = tabs[i].getTitle();
                         //        ul.appendChild(li);
                                kango.console.log(tabs[i].getUrl());
                        }
                        // document.body.appendChild(ul);
                });
	});
});