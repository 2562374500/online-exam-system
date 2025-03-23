import{E as e,a as l}from"./index-C2nHEva2.js";import{z as a,Z as t,r as o,A as n,R as u,J as s,ai as i,C as d,O as r,Q as p,a8 as m,P as c,B as v,L as f,I as y}from"./vue-vendor-Cplzq9AV.js";import{_ as b}from"./_plugin-vue_export-helper-BCo6x5W8.js";const V={class:"paper-list"},_={class:"header-content"},g={class:"question-list"},C={class:"question-header"},h={class:"question-actions"},w={class:"dialog-footer"},k={class:"paper-preview"},q={class:"paper-info"},S={class:"paper-meta"},U={class:"questions-preview"},x={class:"question-preview-header"},j={class:"question-number"},J={class:"question-type"},O={class:"question-score"},z={class:"question-content"},A={class:"question-title"},B={key:0,class:"question-options"},N={class:"question-answer"},I=b(a({__name:"PaperList",setup(a){const b=t([{id:1,name:"Java基础试卷",totalScore:100,duration:"120分钟",questionCount:20,questions:[{title:"Java中的基本数据类型有哪些？",type:"multiple",score:10,options:[{label:"byte",value:"A"},{label:"short",value:"B"},{label:"int",value:"C"},{label:"long",value:"D"},{label:"string",value:"E"}],answer:["A","B","C","D"]},{title:"以下说法正确吗：Java中的String是基本数据类型",type:"judge",score:5,answer:!1}]}]),I=o(!1),D=o(!1),E=o(!1),L=o({}),P=t({id:0,name:"",totalScore:100,duration:"",questionCount:0,questions:[]}),T=()=>{E.value=!1,Object.assign(P,{id:0,name:"",totalScore:100,duration:"",questionCount:0,questions:[]}),I.value=!0},Q=()=>{P.questions.push({title:"",type:"single",score:5,options:[{label:"",value:"A"},{label:"",value:"B"},{label:"",value:"C"},{label:"",value:"D"}],answer:""})},R=()=>{if(P.name&&P.duration)if(0!==P.questions.length){if(P.questionCount=P.questions.length,P.totalScore=P.questions.reduce(((e,l)=>e+l.score),0),E.value){const e=b.findIndex((e=>e.id===P.id));-1!==e&&(b[e]=JSON.parse(JSON.stringify(P)))}else P.id=b.length+1,b.push(JSON.parse(JSON.stringify(P)));I.value=!1,l.success(E.value?"编辑成功":"创建成功")}else l.warning("请至少添加一道题目");else l.warning("请填写完整的试卷信息")};return(a,t)=>{const o=i("el-button"),Z=i("el-header"),F=i("el-table-column"),G=i("el-table"),H=i("el-input"),K=i("el-form-item"),M=i("el-input-number"),W=i("el-option"),X=i("el-select"),Y=i("el-checkbox"),$=i("el-checkbox-group"),ee=i("el-radio"),le=i("el-radio-group"),ae=i("el-form"),te=i("el-card"),oe=i("el-dialog"),ne=i("el-main"),ue=i("el-container");return v(),n("div",V,[u(ue,null,{default:s((()=>[u(Z,null,{default:s((()=>[d("div",_,[t[7]||(t[7]=d("h2",null,"试卷列表",-1)),u(o,{type:"primary",onClick:T},{default:s((()=>t[6]||(t[6]=[r("创建试卷")]))),_:1})])])),_:1}),u(ne,null,{default:s((()=>[u(G,{data:b,style:{width:"100%"}},{default:s((()=>[u(F,{prop:"name",label:"试卷名称"}),u(F,{prop:"totalScore",label:"总分"}),u(F,{prop:"duration",label:"建议时长"}),u(F,{prop:"questionCount",label:"题目数量"}),u(F,{label:"操作",width:"250"},{default:s((a=>[u(o,{type:"primary",size:"small",onClick:e=>{return l=a.row,L.value=l,void(D.value=!0);var l}},{default:s((()=>t[8]||(t[8]=[r("预览")]))),_:2},1032,["onClick"]),u(o,{type:"warning",size:"small",onClick:e=>{return l=a.row,E.value=!0,Object.assign(P,JSON.parse(JSON.stringify(l))),void(I.value=!0);var l}},{default:s((()=>t[9]||(t[9]=[r("编辑")]))),_:2},1032,["onClick"]),u(o,{type:"danger",size:"small",onClick:t=>{return o=a.row,void e.confirm("确定要删除这份试卷吗？","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((()=>{const e=b.findIndex((e=>e.id===o.id));-1!==e&&(b.splice(e,1),l.success("删除成功"))}));var o}},{default:s((()=>t[10]||(t[10]=[r("删除")]))),_:2},1032,["onClick"])])),_:1})])),_:1},8,["data"]),u(oe,{modelValue:I.value,"onUpdate:modelValue":t[4]||(t[4]=e=>I.value=e),title:E.value?"编辑试卷":"创建试卷",width:"60%"},{footer:s((()=>[d("span",w,[u(o,{onClick:t[3]||(t[3]=e=>I.value=!1)},{default:s((()=>t[17]||(t[17]=[r("取消")]))),_:1}),u(o,{type:"primary",onClick:R},{default:s((()=>t[18]||(t[18]=[r("保存")]))),_:1})])])),default:s((()=>[u(ae,{model:P,"label-width":"100px"},{default:s((()=>[u(K,{label:"试卷名称"},{default:s((()=>[u(H,{modelValue:P.name,"onUpdate:modelValue":t[0]||(t[0]=e=>P.name=e),placeholder:"请输入试卷名称"},null,8,["modelValue"])])),_:1}),u(K,{label:"总分"},{default:s((()=>[u(M,{modelValue:P.totalScore,"onUpdate:modelValue":t[1]||(t[1]=e=>P.totalScore=e),min:0,max:100},null,8,["modelValue"])])),_:1}),u(K,{label:"建议时长"},{default:s((()=>[u(H,{modelValue:P.duration,"onUpdate:modelValue":t[2]||(t[2]=e=>P.duration=e),placeholder:"请输入建议时长（如：120分钟）"},null,8,["modelValue"])])),_:1}),u(K,{label:"试卷题目"},{default:s((()=>[d("div",g,[(v(!0),n(p,null,m(P.questions,((e,l)=>(v(),n("div",{key:l,class:"question-edit-item"},[u(te,null,{header:s((()=>[d("div",C,[d("span",null,"题目 "+c(l+1),1),d("div",h,[u(M,{modelValue:e.score,"onUpdate:modelValue":l=>e.score=l,min:0,max:100,size:"small",placeholder:"分值"},null,8,["modelValue","onUpdate:modelValue"]),u(o,{type:"danger",size:"small",onClick:e=>(e=>{P.questions.splice(e,1)})(l)},{default:s((()=>t[11]||(t[11]=[r("删除")]))),_:2},1032,["onClick"])])])])),default:s((()=>[u(ae,{model:e},{default:s((()=>[u(K,{label:"题目"},{default:s((()=>[u(H,{modelValue:e.title,"onUpdate:modelValue":l=>e.title=l,type:"textarea",rows:2},null,8,["modelValue","onUpdate:modelValue"])])),_:2},1024),u(K,{label:"题型"},{default:s((()=>[u(X,{modelValue:e.type,"onUpdate:modelValue":l=>e.type=l,placeholder:"请选择题型"},{default:s((()=>[u(W,{label:"单选题",value:"single"}),u(W,{label:"多选题",value:"multiple"}),u(W,{label:"判断题",value:"judge"}),u(W,{label:"简答题",value:"text"})])),_:2},1032,["modelValue","onUpdate:modelValue"])])),_:2},1024),["single","multiple"].includes(e.type)?(v(),n(p,{key:0},[u(K,{label:"选项"},{default:s((()=>[(v(!0),n(p,null,m(e.options,((l,a)=>(v(),n("div",{key:a,class:"option-item"},[u(H,{modelValue:l.label,"onUpdate:modelValue":e=>l.label=e,placeholder:"选项内容"},{prepend:s((()=>[r(c(String.fromCharCode(65+a)),1)])),_:2},1032,["modelValue","onUpdate:modelValue"]),u(o,{type:"danger",size:"small",onClick:l=>((e,l)=>{e.options&&e.options.splice(l,1)})(e,a)},{default:s((()=>t[12]||(t[12]=[r("删除")]))),_:2},1032,["onClick"])])))),128)),u(o,{type:"primary",size:"small",onClick:l=>(e=>{e.options||(e.options=[]),e.options.push({label:"",value:String.fromCharCode(65+e.options.length)})})(e)},{default:s((()=>t[13]||(t[13]=[r("添加选项")]))),_:2},1032,["onClick"])])),_:2},1024),u(K,{label:"正确答案"},{default:s((()=>["single"===e.type?(v(),y(X,{key:0,modelValue:e.answer,"onUpdate:modelValue":l=>e.answer=l,placeholder:"请选择正确答案"},{default:s((()=>[(v(!0),n(p,null,m(e.options,((e,l)=>(v(),y(W,{key:l,label:String.fromCharCode(65+l),value:String.fromCharCode(65+l)},null,8,["label","value"])))),128))])),_:2},1032,["modelValue","onUpdate:modelValue"])):(v(),y($,{key:1,modelValue:e.answer,"onUpdate:modelValue":l=>e.answer=l},{default:s((()=>[(v(!0),n(p,null,m(e.options,((e,l)=>(v(),y(Y,{key:l,label:String.fromCharCode(65+l)},{default:s((()=>[r(c(String.fromCharCode(65+l)),1)])),_:2},1032,["label"])))),128))])),_:2},1032,["modelValue","onUpdate:modelValue"]))])),_:2},1024)],64)):f("",!0),"judge"===e.type?(v(),y(K,{key:1,label:"正确答案"},{default:s((()=>[u(le,{modelValue:e.answer,"onUpdate:modelValue":l=>e.answer=l},{default:s((()=>[u(ee,{label:!0},{default:s((()=>t[14]||(t[14]=[r("正确")]))),_:1}),u(ee,{label:!1},{default:s((()=>t[15]||(t[15]=[r("错误")]))),_:1})])),_:2},1032,["modelValue","onUpdate:modelValue"])])),_:2},1024)):f("",!0),"text"===e.type?(v(),y(K,{key:2,label:"参考答案"},{default:s((()=>[u(H,{modelValue:e.answer,"onUpdate:modelValue":l=>e.answer=l,type:"textarea",rows:3,placeholder:"请输入参考答案"},null,8,["modelValue","onUpdate:modelValue"])])),_:2},1024)):f("",!0)])),_:2},1032,["model"])])),_:2},1024)])))),128)),u(o,{type:"primary",onClick:Q},{default:s((()=>t[16]||(t[16]=[r("添加题目")]))),_:1})])])),_:1})])),_:1},8,["model"])])),_:1},8,["modelValue","title"]),u(oe,{modelValue:D.value,"onUpdate:modelValue":t[5]||(t[5]=e=>D.value=e),title:"试卷预览",width:"80%"},{default:s((()=>[d("div",k,[d("div",q,[d("h2",null,c(L.value.name),1),d("div",S,[d("span",null,"总分："+c(L.value.totalScore)+"分",1),d("span",null,"建议时长："+c(L.value.duration),1)])]),d("div",U,[(v(!0),n(p,null,m(L.value.questions,((e,l)=>{return v(),n("div",{key:l,class:"question-preview-item"},[d("div",x,[d("span",j,c(l+1),1),d("span",J,"["+c((a=e.type,{single:"单选题",multiple:"多选题",judge:"判断题",text:"简答题"}[a]||a))+"]",1),d("span",O,c(e.score)+"分",1)]),d("div",z,[d("p",A,c(e.title),1),["single","multiple"].includes(e.type)?(v(),n("div",B,[(v(!0),n(p,null,m(e.options,((e,l)=>(v(),n("div",{key:l,class:"option"},c(String.fromCharCode(65+l))+". "+c(e.label),1)))),128))])):f("",!0),d("div",N,[t[19]||(t[19]=d("strong",null,"答案：",-1)),"single"===e.type||"multiple"===e.type?(v(),n(p,{key:0},[r(c(Array.isArray(e.answer)?e.answer.join("、"):e.answer),1)],64)):"judge"===e.type?(v(),n(p,{key:1},[r(c(e.answer?"正确":"错误"),1)],64)):(v(),n(p,{key:2},[r(c(e.answer),1)],64))])])]);var a})),128))])])])),_:1},8,["modelValue"])])),_:1})])),_:1})])}}}),[["__scopeId","data-v-ed955b66"]]);export{I as default};
