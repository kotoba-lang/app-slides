goog.provide('slides.ui');
slides.ui.fact = (function slides$ui$fact(label,value){
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"class","class",-2030961996),"fact"], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span","span",1394872991),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"class","class",-2030961996),"fact-label"], null),label], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"strong","strong",269529000),value], null)], null);
});
slides.ui.panel = (function slides$ui$panel(var_args){
var args__5732__auto__ = [];
var len__5726__auto___22991 = arguments.length;
var i__5727__auto___22992 = (0);
while(true){
if((i__5727__auto___22992 < len__5726__auto___22991)){
args__5732__auto__.push((arguments[i__5727__auto___22992]));

var G__22993 = (i__5727__auto___22992 + (1));
i__5727__auto___22992 = G__22993;
continue;
} else {
}
break;
}

var argseq__5733__auto__ = ((((1) < args__5732__auto__.length))?(new cljs.core.IndexedSeq(args__5732__auto__.slice((1)),(0),null)):null);
return slides.ui.panel.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__5733__auto__);
});

(slides.ui.panel.cljs$core$IFn$_invoke$arity$variadic = (function (title,body){
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"section","section",-300141526),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"class","class",-2030961996),"panel"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"h2","h2",-372662728),title], null),body], null);
}));

(slides.ui.panel.cljs$lang$maxFixedArity = (1));

/** @this {Function} */
(slides.ui.panel.cljs$lang$applyTo = (function (seq22983){
var G__22984 = cljs.core.first(seq22983);
var seq22983__$1 = cljs.core.next(seq22983);
var self__5711__auto__ = this;
return self__5711__auto__.cljs$core$IFn$_invoke$arity$variadic(G__22984,seq22983__$1);
}));

slides.ui.muted = (function slides$ui$muted(text){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"p","p",151049309),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"class","class",-2030961996),"muted"], null),text], null);
});
slides.ui.root_view = (function slides$ui$root_view(){
var app = slides.state.app_info;
return cljs.core.with_meta(new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"main","main",-2117802661),new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"section","section",-300141526),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"class","class",-2030961996),"top"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"p","p",151049309),["Cloudflare ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"kind","kind",-717265803).cljs$core$IFn$_invoke$arity$1(app))].join('')], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"h1","h1",-1896887462),new cljs.core.Keyword(null,"title","title",636505583).cljs$core$IFn$_invoke$arity$1(app)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span","span",1394872991),new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(app)], null)], null),new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"section","section",-300141526),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"class","class",-2030961996),"facts"], null),slides.ui.fact("Project",new cljs.core.Keyword(null,"project","project",1124394579).cljs$core$IFn$_invoke$arity$1(app)),slides.ui.fact("Routes",cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"route-count","route-count",-1535759193).cljs$core$IFn$_invoke$arity$1(app))),slides.ui.fact("XRPC",(cljs.core.truth_(new cljs.core.Keyword(null,"xrpc","xrpc",-1294004094).cljs$core$IFn$_invoke$arity$1(app))?"enabled":"not configured"))], null),slides.ui.panel.cljs$core$IFn$_invoke$arity$variadic("Public Routes",cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([((cljs.core.seq(new cljs.core.Keyword(null,"routes","routes",457900162).cljs$core$IFn$_invoke$arity$1(app)))?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"ul","ul",-1349521403),cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (route){
return cljs.core.with_meta(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"li","li",723558921),route], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),route], null));
}),new cljs.core.Keyword(null,"routes","routes",457900162).cljs$core$IFn$_invoke$arity$1(app))], null):slides.ui.muted("No public route is declared next to this app surface."))], 0)),slides.ui.panel.cljs$core$IFn$_invoke$arity$variadic("Runtime Bindings",cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([((cljs.core.seq(new cljs.core.Keyword(null,"vars","vars",-2046957217).cljs$core$IFn$_invoke$arity$1(app)))?new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"ul","ul",-1349521403),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"class","class",-2030961996),"chips"], null),cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (k){
return cljs.core.with_meta(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"li","li",723558921),k], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),k], null));
}),new cljs.core.Keyword(null,"vars","vars",-2046957217).cljs$core$IFn$_invoke$arity$1(app))], null):slides.ui.muted("No public vars are declared in the nearest wrangler config."))], 0)),slides.ui.panel.cljs$core$IFn$_invoke$arity$variadic("Source",cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"p","p",151049309),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"class","class",-2030961996),"path-p"], null),new cljs.core.Keyword(null,"relative-path","relative-path",1848635172).cljs$core$IFn$_invoke$arity$1(app)], null)], 0))], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),"root"], null));
});

//# sourceMappingURL=slides.ui.js.map
