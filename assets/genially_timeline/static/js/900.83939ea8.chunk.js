"use strict";(self.webpackChunk_genially_view_client=self.webpackChunk_genially_view_client||[]).push([[900],{91720:(e,t,i)=>{i.d(t,{Z:()=>c});var r=i(45992),n=i(62772),o=i(17588),a=i(97690);const s=e=>({transform:`${e.preTransforms.join(" ")} scale(${e.scale}) rotateX(${e.rotateX}deg) rotateY(${e.rotateY}deg) ${(0,a.Y)(e.rotateZ)}`,transition:e.transitions.join(", "),filter:e.filters.join(" ")});const l=e=>{const[t,i]=(0,o.useState)(null),[n,a]=(0,o.useState)(void 0),[l,d]=(0,o.useState)(void 0),[c,m]=(0,o.useState)(!1),p=(0,o.useRef)(null),u=(0,o.useCallback)((e=>{p.current=e,i(e)}),[]);(0,o.useEffect)((()=>{e&&(a(void 0),d(void 0),m(!1))}),[e]);const g=(0,o.useCallback)((i=>{if(!t||e)return;m(!0);const r=t.getBoundingClientRect(),n=(i.clientX-r.left)/r.width,o=(i.clientY-r.top)/r.height,s={coords:{x:Math.min(Math.max(n,0),1),y:Math.min(Math.max(o,0),1)}};a(s),c||d(s)}),[t,c,e]),f=(0,o.useCallback)((()=>{a(void 0),m(!1)}),[]),{innerCardStyle:h,specialFxLayerStyles:v}=function(e){let{hoveringState:t}=e;const i={scale:1,rotateX:0,rotateY:0,rotateZ:0,preTransforms:[],transitions:[],filters:[]};i.rotateZ+=0;const r=[],n=e=>{var t;return null!==(t=r[e])&&void 0!==t||(r[e]={scale:1,rotateX:0,rotateY:0,rotateZ:0,preTransforms:[],transitions:[],filters:[]}),r[e]},o="perspective(1500px)",a=n(0),l=n(1),d="cubic-bezier(0.89, -0.3, 0.18, 1.37)";i.transitions.push(`transform 400ms ${d}`),a.transitions.push("transform 100ms linear"),l.transitions.push(`filter 400ms ${d}`);const c=e=>`drop-shadow(rgba(0, 15, 51, ${e}) 0px 1px 8px)`;if(t){i.preTransforms.push(o),a.preTransforms.push(o),l.filters.push(c(.3)),i.scale+=.05;const{coords:e}=t,r=20;a.rotateX+=r*-(e.y-.5),a.rotateY+=r*(e.x-.5)}else l.filters.push(c(0));return{specialFxLayerStyles:r.filter((e=>!!e)).map((e=>Object.assign(Object.assign({},s(e)),{top:0,bottom:0,left:0,right:0,width:"100%",height:"100%"}))),innerCardStyle:Object.assign({},s(i))}}({hoveringState:!n&&c?l:n}),x=(e,t)=>0===t.length?e:(0,r.jsx)("div",{style:t[0],children:x(e,t.slice(1))});return{handleMouseEnterOrMove:g,handleMouseLeave:f,innerCardStyle:h,specialFxLayerStyles:v,setCardRef:u,wrapInsideStyledCard:x}};var d=i(11833);const c=e=>{let{title:t,frontImageSrc:i,coverImageSrc:o,fitImages:a,flipped:s,burned:c,onClick:m}=e;const p=Boolean(c),u=Boolean(s),{handleMouseEnterOrMove:g,handleMouseLeave:f,innerCardStyle:h,setCardRef:v,specialFxLayerStyles:x,wrapInsideStyledCard:y}=l(u);return y((0,r.jsxs)(d.Ox,{onMouseMove:g,onMouseEnter:g,onMouseLeave:f,role:"button",style:u?h:{},$burned:p,$flipped:u,ref:v,onClick:e=>{e.stopPropagation(),m&&m()},"aria-label":`Card showing ${u?"front":"back"} side with title: ${t}`,"aria-disabled":p,tabIndex:p?-1:0,children:[(0,r.jsx)("img",{style:{opacity:u?1:0,position:"absolute",top:0,left:0,width:"100%",height:"100%",objectFit:a?"contain":"cover",transition:`opacity ${d.uD}ms steps(1)`},src:i,alt:"front"}),(0,r.jsx)("img",{style:{opacity:u?0:1,position:"absolute",top:0,left:0,width:"100%",height:"100%",objectFit:a?"contain":"cover",transition:`opacity ${d.uD}ms steps(1)`},src:o,alt:"cover"}),t&&(0,r.jsx)(d.aW,{hidden:!u,children:(0,r.jsx)(n.m_,{text:t,placement:n.m_.Position.TOP,fallbackPlacements:[n.m_.Position.TOP],renderReferencePortalNode:document.querySelector("body"),children:(0,r.jsx)(d.hE,{"data-testid":"card-title",children:t})})})]}),x)}},11833:(e,t,i)=>{i.d(t,{Ox:()=>l,aW:()=>a,hE:()=>s,rl:()=>n,uD:()=>o});var r=i(37577);const n=1e3,o=n/3.4,a=r.Ay.div({display:"flex",justifyContent:"center",alignItems:"center",flexShrink:0,position:"absolute",paddingLeft:"12px",paddingRight:"12px",bottom:0,left:0,userSelect:"none",minHeight:"25%",top:"75%",width:"100%",backgroundColor:"rgba(18,18,18,0.5)"}),s=r.Ay.p({color:"white",fontSize:12,textAlign:"center",fontStyle:"normal",fontWeight:400,lineHeight:"16px",overflow:"hidden",textOverflow:"ellipsis",wordWrap:"break-word",whiteSpace:"nowrap",pointerEvents:"none"}),l=r.Ay.div`
  @keyframes rotate-out {
    0% {
      transform: rotateY(0deg);
    }
    33% {
      transform: rotateY(90deg);
    }
    100% {
      transform: rotateY(0deg);
    }
  }

  @keyframes rotate-in {
    0% {
      transform: rotateY(0deg);
    }
    33% {
      transform: rotateY(90deg);
    }
    100% {
      transform: rotateY(0deg);
    }
  }

  @keyframes pulse {
    0% {
      transform: scale(1);
    }
    12% {
      transform: scale(1.05, 1.05);
    }
    40% {
      transform: scale(1.05, 1.05);
    }
    100% {
      transform: scale(1);
    }
  }

  position: relative;
  overflow: hidden;
  flex-shrink: 0;
  width: 100%;
  height: 100%;

  cursor: ${e=>{let{$flipped:t,$burned:i}=e;return t||i?"default":"pointer"}};

  animation-name: ${e=>{let{$flipped:t}=e;return t?"rotate-out":"rotate-in"}}
    ${e=>{let{$burned:t}=e;return t?",pulse":""}};
  animation-duration: ${n}ms;
  animation-delay: 0ms, ${n}ms;
  animation-iteration-count: 1;
  animation-timing-function: ease-out, ease-in-out;
  perspective: 1500px;

  border-radius: ${e=>{let{theme:t}=e;return t.borderRadius.large}};

  /* HACK: We need to set border as important because .genially-embed is reseting our borders in the View */
  border: 1px solid
    ${e=>{let{theme:t,$flipped:i}=e;return i?t.color.border.primary.disabled():t.color.border.primary.default()}} !important;
  outline: 1px white solid;

  filter: ${e=>{let{$flipped:t}=e;return t?"":"drop-shadow(0px 1px 4px rgba(0, 15, 51, 0.2))"}};

  &:hover {
    filter: ${e=>{let{$flipped:t}=e;return t?"":"drop-shadow(rgba(0, 15, 51, 0.3) 0px 1px 8px)"}};
    border-color: ${e=>{let{theme:t,$flipped:i}=e;return i?t.color.border.primary.disabled():t.color.border.primary.hover()}} !important;
  }

  ${a} {
    visibility: ${e=>{let{$flipped:t}=e;return t?"initial":"hidden"}};
    transition: visibility ${o}ms steps(1);
    z-index: 1;
  }

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
    width: 100%;
    height: 100%;
    opacity: ${e=>{let{$burned:t}=e;return t?"0.4":"0"}};
    transition: opacity ${n}ms steps(1);
    transition-delay: ${n}ms;
    background-color: white;
    pointer-events: none;
  }
`},63110:(e,t,i)=>{i.d(t,{x:()=>l});var r=i(45992),n=i(40671),o=i(99049),a=i(76838),s=i(67333);const l=e=>{let{items:t,renderItem:i,keyExtractor:l,getComputedStyles:d}=e;const c=(0,a.f)(t.length);return(0,r.jsx)(s.x,{numColumns:c.numColumns,numRows:c.numRows,children:(0,r.jsx)(n.N,{children:t.map(((e,t)=>(0,r.jsx)(o.P.div,{layout:!0,style:d?d(e,t):void 0,initial:{opacity:0,scale:.7},animate:{opacity:1,scale:1},transition:{type:"spring",ease:"linear",stiffness:150,damping:20},"data-testid":`grid-item-${l(e)}`,children:i(e)},l(e))))})})}},67333:(e,t,i)=>{i.d(t,{m:()=>o,x:()=>n});var r=i(37577);const n=r.Ay.div`
  display: grid;
  grid-template-columns: repeat(${e=>e.numColumns}, minmax(0, 1fr));
  grid-template-rows: repeat(${e=>e.numRows}, 1fr);
  height: 100%;
  gap: 16px;
  padding: 8px;
  perspective: 1500px;
`,o=r.Ay.canvas({width:"100%",height:"100%",pointerEvents:"none",position:"absolute",top:0,left:0,zIndex:3})},900:(e,t,i)=>{i.r(t),i.d(t,{geniallyFindThePairEditorScript:()=>g});var r=i(45992),n=i(54072),o=i(62772),a=i(57277),s=i(17588),l=i(37577),d=i(91720),c=i(63110);const m=e=>{let{theme:t,pairedImages:i,fitImages:n,forwardSetFlipped:o,coverImageSrc:a}=e;const[m,p]=(0,s.useState)(!1);return(0,s.useEffect)((()=>{o(p)}),[o]),(0,r.jsx)(l.NP,{theme:t,children:(0,r.jsx)(c.x,{items:i,renderItem:e=>(0,r.jsx)(d.Z,{title:e.title,frontImageSrc:e.src,coverImageSrc:a,fitImages:n,flipped:m}),keyExtractor:e=>e.id,getComputedStyles:()=>({pointerEvents:"none"})})})};var p=i(76838);const u=e=>null!==e,g=e=>{let{script:t,editor:i}=e;const s=t.item;if(!s)return;s.thumbnail="https://static.genially.com/widgets/find-the-pair-thumbnail";let l,d=[];t.on("configChange",(e=>{let{config:t,prevConfig:i}=e;if(!i)return;const{itemList:r}=t,{itemList:o}=i;d=((e,t,i)=>e.map(((e,r)=>{var o;if(r>=t.length&&e.image)return{src:e.image.source||"",title:e.title,altText:e.image.altText||"",id:(0,n.Ak)()};const a=t[r];return(null===a||void 0===a?void 0:a.image)&&e.image&&(e.image.source!==a.image.source||e.title!==a.title||e.image.altText!==a.image.altText)?Object.assign(Object.assign({},i[r]),{src:(null===(o=e.image)||void 0===o?void 0:o.source)||"",title:e.title,altText:e.image.altText||""}):i[r]})))(r,o,d);if(0===r.length-o.length)return;const a=2*o.length,l=(0,p.f)(a),c=s.width/l.numColumns,m=s.height/l.numRows,u=2*r.length,g=(0,p.f)(u);s.setSize(g.numColumns*c,g.numRows*m)})),i.on("sidebarOpened",(e=>{let{isOpened:t}=e;l&&l(t)})),(0,a.x)({getTargetNodeItem:()=>t.item,renderApp:()=>{const{justCreatedFromSidebar:e}=i,{itemList:a,coverImage:s,fitImages:c}=t.getConfig();0===d.length&&(d=(e=>e.map((e=>null===e.image.source?null:{src:e.image.source,title:e.title,id:(0,n.Ak)(),altText:e.image.altText||""})).filter(u))(a));const p=(e=>{const t=e.map((e=>Object.assign(Object.assign({},e),{id:`${e.id}-pair`}))).reverse();return[...e,...t]})(d);return(0,r.jsx)(m,{theme:o.iF.themes.newPrimary,pairedImages:p,coverImageSrc:String(s.source),fitImages:c,forwardSetFlipped:t=>{e&&t(!0),l=t}})},nodePrefix:"find-the-pair"})({script:t,editor:i})}},76838:(e,t,i)=>{i.d(t,{f:()=>r});const r=e=>{let t=4;for(;e%t!==0;)t+=1;return{numColumns:t,numRows:e/t}}},57277:(e,t,i)=>{i.d(t,{x:()=>n});var r=i(70377);function n(e){let{getTargetNodeItem:t,renderApp:i,nodePrefix:n}=e;return e=>{let{script:o,editor:a}=e,s=null;function l(e){s&&(r.unmountComponentAtNode(s),s=null),e&&"innerHtml"in e&&(e.innerHtml='<div class="card-iframe"><div style="width: 100%; height: 100%; background: #FF0000; color: #FFFFFF;">Deleted</div><script><\/script></div>')}function d(){s&&r.render(i(),s)}function c(){const e=t(o.getConfig());if(!e)return;const i=`${n}-${e.id}`;"innerHtml"in e&&(e.innerHtml=`<div class="card-iframe"><div id="${i}" class="genially-widget-app" style="width: 100%; height: 100%;"></div></div>`),requestAnimationFrame((()=>{s="idOfFreeNode"in e?document.getElementById(e.idOfFreeNode):document.getElementById(i),d()}))}o.on("configChange",(e=>{let{config:i,prevConfig:r}=e;const n=t(i),o=r?t(r):void 0;o&&o!==n&&l(o),n&&(n!==o?c():d())})),o.on("dispose",(()=>{l(t(o.getConfig()))})),a.on("itemMount",(e=>{let{item:t}=e;t===o.item&&c()})),a.on("itemUnmount",(e=>{let{item:t}=e;t===o.item&&l()}))}}}}]);
//# sourceMappingURL=https://s3-static-genially.genially.com/view/static/js/900.83939ea8.chunk.js.map