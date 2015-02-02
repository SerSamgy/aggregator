// ==UserScript==
// @name Aggregator
// @include http://*
// @include https://*
// /==UserScript==

function create_list_div(count_num) {
    var div = document.createElement('div');
    div.setAttribute('id', count_num);
    var input = document.createElement('input');
    input.setAttribute('type', 'checkbox');
    var span = document.createElement('span');
    div.appendChild(input);
    div.appendChild(span);
    return div;
};

KangoAPI.onReady(function() {
    var get_details = {
        url: 'http://localhost:8080/',
        method: 'GET',
        async: true,
        contentType: 'json'
    };
	// kango.browser.tabs.getAll(function(tabs) {
        kango.browser.windows.getCurrent(function(win) {
                win.getTabs(function(tabs) {
                        // var ul = document.createElement("ul");
                        for(var i = 0; i < tabs.length; i++) {
                                var div = create_list_div(i);
                                var input = div.firstElementChild;
                                input.setAttribute('id', tabs[i].getId());
                                input.setAttribute('value', tabs[i].getUrl());
                                var span = div.lastElementChild;
                                span.textContent = tabs[i].getTitle();
                                document.getElementById('tab1').firstElementChild.appendChild(div);
                        	// var li = document.createElement("li");
                        	// li.textContent = tabs[i].getTitle();
                         //        ul.appendChild(li);
                                // kango.console.log(tabs[i].getUrl());
                        }
                        // document.body.appendChild(ul);
                });
	});

    // TODO: Move to background script
    kango.xhr.send(get_details, function(data) {
        var tabsGet = data.response;
        var divsGet = document.getElementById("tab2").firstElementChild;
        // kango.console.log(tabsGet);
        if (tabsGet.length != 0) {
            for (var i = tabsGet.length - 1; i >= 0; i--) {
                var div = create_list_div(i);
                var input = div.firstElementChild;
                // input.setAttribute('id', tabs[i].getId());
                // input.setAttribute('value', tabs[i].getUrl());
                var span = div.lastElementChild;
                span.textContent = tabsGet[i][0];
                divsGet.appendChild(div);
            };
        } 
        else {
            var not_avail = document.createElement('p');
            not_avail.textContent = "There are no available tabs!";
            divsGet.appendChild(not_avail);
        };
    });

    document.getElementById('popup-get').onclick = function() {
        kango.xhr.send(get_details, function(data) {
            var info = data.response;
            for (var i = info.length - 1; i >= 0; i--) {
                // kango.console.log(info[i][0]);
                kango.browser.tabs.create({url: info[i][0], focused: false})
            };
            // kango.console.log(info);
        });
    };

    document.getElementById('popup-send').onclick = function() {
        var send_details = {
            method: 'POST',
            url: 'http://localhost:8080/',
            async: true,
            params: {'link': []}, // all values in parameter 'link' will be separated using comma
            contentType: 'json'
        };
        for (var i = 0; i < document.getElementById("tab1").firstElementChild.children.length; i++) {
            var child = document.getElementById("tab1").firstElementChild.children[i].firstElementChild;
            if (child.checked) {
                send_details['params']['link'].push(child.value);
            };
        };
        // kango.console.log(send_details);
        kango.xhr.send(send_details, function(data) {
            if (data.status == 200 && data.response != null) {
                var text = data.response;
                kango.console.log(text);
            } 
            else {
                kango.console.log('Something went wrong!')
            };
        });
    };

    var theTabs = document.getElementById('Tabs').firstElementChild;
    theTabs.addEventListener("click", tab, false);
    function tab(e) {
        for (var i = theTabs.children.length - 1; i >= 0; i--) {
            document.getElementById(theTabs.children[i].id.slice(3)).style.display = 'none';
            theTabs.children[i].setAttribute("class", "");
        };
        if (e.target !== e.currentTarget) {
            var clickedItemParent = e.target.parentElement;
            document.getElementById(clickedItemParent.id.slice(3)).style.display = 'block';
            clickedItemParent.setAttribute("class", "active");
        }
        e.stopPropagation();
    };

});