(this.webpackJsonpshuffly=this.webpackJsonpshuffly||[]).push([[0],{29:function(e,t,n){},30:function(e,t,n){},31:function(e,t,n){},33:function(e,t,n){},34:function(e,t,n){},35:function(e,t,n){},36:function(e,t,n){},37:function(e,t,n){},46:function(e,t,n){"use strict";n.r(t);var r=n(1),s=n(22),a=n.n(s),i=(n(29),n(18)),c=n(4),o=n(5),l=n(7),u=n(6),p=n(23),d=n(2);n(30);n(31);var h=n.p+"static/media/logo.b1cdd032.png",j=n(0),f=function(e){Object(l.a)(n,e);var t=Object(u.a)(n);function n(){return Object(c.a)(this,n),t.apply(this,arguments)}return Object(o.a)(n,[{key:"login",value:function(){var e=function(e){for(var t="",n="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",r=0;r<e;r++)t+=n.charAt(Math.floor(Math.random()*n.length));return t}(16),t="https://accounts.spotify.com/authorize?response_type=token&client_id="+encodeURIComponent("7306ac07764749518aca94d65ccfe50d")+"&scope="+encodeURIComponent(["playlist-read-private","playlist-modify-public","playlist-modify-private"].join(" "))+"&redirect_uri="+encodeURIComponent("https://dvd-z.github.io/shuffly/app")+"&state="+encodeURIComponent(e);window.location=t}},{key:"render",value:function(){var e=this;return Object(j.jsxs)("div",{id:"background",children:[Object(j.jsxs)("div",{id:"text-container",children:[Object(j.jsxs)("span",{id:"welcome",children:[Object(j.jsx)("span",{role:"img","aria-label":"Hand wave",children:"\ud83d\udc4b"}),"\xa0\xa0Hey there, welcome to Shuffly"]}),Object(j.jsx)("span",{id:"description",children:"Shuffly is a service that directly accesses your Spotify playlists to randomly reorder the tracks on them in place"}),Object(j.jsxs)("div",{id:"button-container",children:[Object(j.jsx)("button",{className:"SpotifyButton",onClick:function(){return e.login()},children:"LOG IN WITH SPOTIFY"}),Object(j.jsx)("span",{id:"powered-by",children:"Powered by Spotify API"}),Object(j.jsx)("span",{id:"github",children:Object(j.jsx)("a",{href:"https://github.com/dvd-z/shuffly",children:"Check out the code on GitHub"})})]})]}),Object(j.jsx)("div",{id:"img-wrapper",children:Object(j.jsx)("img",{alt:"Shuffly logo",id:"logo",src:h})})]})}}]),n}(r.Component),b=n(13),y=(n(33),n(11)),O=n.n(y),v=(n(34),new O.a),m=function(e){Object(l.a)(n,e);var t=Object(u.a)(n);function n(e){var r;return Object(c.a)(this,n),(r=t.call(this,e)).state={shuffling:!1},r}return Object(o.a)(n,[{key:"fetchNewArt",value:function(e){this.props.fetchNewArt(e)}},{key:"shufflePlaylist",value:function(){var e=this;this.setState({shuffling:!0});var t=this.props.playlist.tracks.total-1,n=setInterval((function(){var r=Math.floor(Math.random()*(t+1));e.swap(t,r),--t<=0&&(clearInterval(n),e.fetchNewArt(e.props.id),e.setState({shuffling:!1}))}),100)}},{key:"swap",value:function(e,t){v.reorderTracksInPlaylist(this.props.playlist.id,t,e+1).catch((function(e){var t=JSON.parse(e.response);console.error(t.error)}))}},{key:"render",value:function(){var e,t,n,r=this;return Object(j.jsxs)("div",{children:[Object(j.jsxs)("div",{id:"playlist-container",children:[Object(j.jsxs)("div",{id:"playlist-metadata",children:[Object(j.jsx)("img",{id:"playlist-art",alt:this.props.playlist.name+" album art",src:null!==(e=null===(t=this.props.playlist.images)||void 0===t||null===(n=t[0])||void 0===n?void 0:n.url)&&void 0!==e?e:"data:,",height:"64"}),Object(j.jsxs)("span",{id:"playlist-descriptions",children:[Object(j.jsx)("span",{id:"playlist-title",children:Object(j.jsx)("a",{id:"playlist-link",href:this.props.playlist.external_urls.spotify,children:this.props.playlist.name})}),Object(j.jsxs)("div",{id:"playlist-songs-container",children:[Object(j.jsx)("span",{id:"playlist-songs",children:this.props.playlist.tracks.total}),Object(j.jsx)("span",{id:"songs-text",children:"\xa0songs"})]})]})]}),Object(j.jsx)("button",{id:"playlist-shuffle",disabled:this.state.shuffling,className:"SpotifyButton ShuffleButton",onClick:function(){return r.shufflePlaylist()},children:this.state.shuffling?"SHUFFLING...":"SHUFFLE"})]}),Object(j.jsx)("hr",{})]})}}]),n}(r.Component),x=new O.a,g=function(e){Object(l.a)(n,e);var t=Object(u.a)(n);function n(){var e;return Object(c.a)(this,n),(e=t.call(this)).state={index:0,playlists:[]},e.fetchNewArt=e.fetchNewArt.bind(Object(b.a)(e)),e}return Object(o.a)(n,[{key:"componentDidMount",value:function(){var e=this;x.getUserPlaylists({index:this.state.index}).then((function(t){return e.setState({playlists:t.items.filter((function(t){return t.owner.id===e.props.userId}))})})).catch((function(e){var t=JSON.parse(e.response);console.error(t.error)}))}},{key:"fetchNewArt",value:function(e){var t=this;x.getPlaylist(e,{fields:"images"}).then((function(n){var r=t.state.playlists;r[t.state.playlists.findIndex((function(t){return t.id===e}))].images=n.images,t.setState({playlists:r})})).catch((function(e){var t=JSON.parse(e.response);console.error(t.error)}))}},{key:"render",value:function(){var e=this,t=this.state.playlists.filter((function(t){return t.name.toLocaleLowerCase().includes(e.props.query.toLocaleLowerCase())})).map((function(t){return Object(j.jsx)(m,{fetchNewArt:e.fetchNewArt,id:t.id,playlist:t},t.id)}));return Object(j.jsxs)("div",{id:"playlists-container",children:[Object(j.jsx)("span",{id:"your-playlists-wrapper",children:Object(j.jsx)("h3",{id:"your-playlists",children:"Your Playlists"})}),Object(j.jsx)("div",{className:"scroller",children:t})]})}}]),n}(r.Component),w=(n(35),function(e){Object(l.a)(n,e);var t=Object(u.a)(n);function n(){var e;return Object(c.a)(this,n),(e=t.call(this)).handleChange=function(t){e.setState({query:t.target.value}),e.props.propagateQuery(t.target.value)},e.state={query:""},e}return Object(o.a)(n,[{key:"render",value:function(){return Object(j.jsx)("div",{id:"search-wrapper",children:Object(j.jsx)("input",{className:"search",type:"text",value:this.state.query,onChange:this.handleChange,placeholder:"Search"})})}}]),n}(r.Component)),k=(n(36),function(e){Object(l.a)(n,e);var t=Object(u.a)(n);function n(){return Object(c.a)(this,n),t.apply(this,arguments)}return Object(o.a)(n,[{key:"render",value:function(){var e,t,n;return this.props.user?((null===(e=this.props.user.images)||void 0===e||null===(t=e[0])||void 0===t?void 0:t.url)&&(n=Object(j.jsx)("img",{alt:"Profile",src:this.props.user.images[0].url,height:"64",id:"display-picture"})),Object(j.jsxs)("div",{id:"user-container",children:[n,Object(j.jsx)("p",{children:this.props.user.display_name})]})):null}}]),n}(r.Component)),S=(n(37),new O.a),C=function(e){Object(l.a)(n,e);var t=Object(u.a)(n);function n(){var e;return Object(c.a)(this,n),(e=t.call(this)).state={query:"",user:null},e.propagateQuery=e.propagateQuery.bind(Object(b.a)(e)),e}return Object(o.a)(n,[{key:"componentDidMount",value:function(){var e=this;S.getMe().then((function(t){return e.setState({user:t})})).catch((function(e){var t=JSON.parse(e.response);console.error(t.error)}))}},{key:"propagateQuery",value:function(e){this.setState({query:e})}},{key:"render",value:function(){var e;return Object(j.jsxs)("div",{id:"menu-container",children:[Object(j.jsxs)("div",{id:"header-container",children:[Object(j.jsx)(w,{propagateQuery:this.propagateQuery,query:this.state.query}),Object(j.jsx)(k,{user:this.state.user})]}),Object(j.jsx)(g,{params:this.props.params,query:this.state.query,userId:null===(e=this.state.user)||void 0===e?void 0:e.id})]})}}]),n}(r.Component),N=function(){return Object(j.jsx)("h1",{children:"Page not found"})};function I(){for(var e,t={},n=/([^&;=]+)=?([^&;]*)/g,r=window.location.hash.substring(1);e=n.exec(r);)t[e[1]]=decodeURIComponent(e[2]);return t}var q=new O.a,A=function(e){Object(l.a)(n,e);var t=Object(u.a)(n);function n(){var e;return Object(c.a)(this,n),(e=t.call(this)).state={params:I(),query:""},e.state.params.access_token&&q.setAccessToken(e.state.params.access_token),e}return Object(o.a)(n,[{key:"render",value:function(){var e=this;return Object(j.jsx)("div",{className:"App",children:Object(j.jsx)(p.a,{basename:"/shuffly",children:Object(j.jsx)("div",{children:Object(j.jsxs)(d.c,{children:[Object(j.jsx)(d.a,{exact:!0,path:"/",component:f}),Object(j.jsx)(d.a,{exact:!0,path:"/app",render:function(t){return Object(j.jsx)(C,Object(i.a)(Object(i.a)({},t),{},{params:e.state.params,query:e.state.query}))}}),Object(j.jsx)(d.a,{component:N})]})})})})}}]),n}(r.Component);n(43).config(),a.a.render(Object(j.jsx)(A,{}),document.getElementById("root"))}},[[46,1,2]]]);
//# sourceMappingURL=main.cbb4322b.chunk.js.map