// ═══════════════════════════════════════════════════════════════════
// JIMMY EXPRESSION PRO — Full Platform
// Cloud storage + Marketplace + Online Booking + Full Salon OS
// ═══════════════════════════════════════════════════════════════════
import { useState, useEffect, useRef } from "react";

// ── DESIGN TOKENS ──────────────────────────────────────────────────
const C = {
  bg:"#080808", surface:"#111", card:"#181818", hover:"#1f1f1f",
  border:"#252525", borderLight:"#2e2e2e",
  gold:"#C9A84C", goldL:"#E4C76B", goldD:"#C9A84C33",
  rose:"#C97B84", roseD:"#C97B8422",
  cream:"#F0EAE0", muted:"#5A5550", subtle:"#2a2a2a",
  green:"#4CAF82", greenD:"#4CAF8220",
  red:"#C95B5B", redD:"#C95B5B20",
  blue:"#5B8FC9", blueD:"#5B8FC920",
  orange:"#C9944C", orangeD:"#C9944C20",
  purple:"#9B7CC9", purpleD:"#9B7CC920",
};

// ── INITIAL DATA ───────────────────────────────────────────────────
const D0 = (off=0)=>{const d=new Date();d.setDate(d.getDate()+off);return d.toISOString().split("T")[0];};
const TODAY = D0(0);

const SEED_SERVICES = [
  {id:"s1",name:"Tape-In Extensions",price:350000,duration:120,cat:"Extensiones",color:C.gold,active:true,desc:"Extensiones adhesivas premium con cinta médica. Resultado natural instantáneo.",img:"💛"},
  {id:"s2",name:"K-Tip Encapsulado Italiano",price:480000,duration:150,cat:"Extensiones",color:C.goldL,active:true,desc:"Técnica italiana de queratina. Mayor duración, aspecto absolutamente natural.",img:"✨"},
  {id:"s3",name:"Mega Hair Nano Pele",price:290000,duration:90,cat:"Extensiones",color:C.rose,active:true,desc:"Micro-extensiones pegadas directamente a la piel. Invisibles al tacto.",img:"🌸"},
  {id:"s4",name:"Mega Hair Slim Soft",price:260000,duration:90,cat:"Extensiones",color:C.rose,active:true,desc:"Extensiones ultralivianas ideales para cabello fino.",img:"🌸"},
  {id:"s5",name:"Plex Generación 4",price:180000,duration:60,cat:"Biomédico",color:C.blue,active:true,desc:"Restauración biomédica capilar de última generación. Sella la barrera lipídica.",img:"🔬"},
  {id:"s6",name:"Mantenimiento Extensions",price:120000,duration:60,cat:"Mantenimiento",color:C.green,active:true,desc:"Reposicionamiento y cuidado de extensiones existentes.",img:"🔧"},
  {id:"s7",name:"Coloración Completa",price:150000,duration:90,cat:"Color",color:C.purple,active:true,desc:"Color de raíz a puntas con tintes premium sin amoniaco.",img:"🎨"},
  {id:"s8",name:"Mechas / Balayage",price:200000,duration:120,cat:"Color",color:C.purple,active:true,desc:"Técnica francesa de aclarado degradado. El look más natural del mercado.",img:"🌟"},
  {id:"s9",name:"Corte + Estilo",price:80000,duration:60,cat:"Básico",color:C.muted,active:true,desc:"Corte profesional con blow-out y estilismo incluido.",img:"✂️"},
  {id:"s10",name:"Tratamiento Keratina",price:130000,duration:90,cat:"Tratamiento",color:C.orange,active:true,desc:"Alisado progresivo con keratina. Hasta 4 meses de duración.",img:"💆"},
];
const SEED_STAFF = [
  {id:"t1",name:"Jimmy Rivera",role:"Director / Senior",color:C.gold,comm:45,base:2000000,phone:"+57 316 447 4596",active:true,sched:{L:1,M:1,X:1,J:1,V:1,S:1,D:0}},
  {id:"t2",name:"Valentina Ríos",role:"Especialista Extensiones",color:C.rose,comm:40,base:1800000,phone:"+57 310 234 5678",active:true,sched:{L:1,M:1,X:1,J:1,V:1,S:1,D:0}},
  {id:"t3",name:"Sara Montoya",role:"Colorista",color:C.purple,comm:38,base:1600000,phone:"+57 320 345 6789",active:true,sched:{L:1,M:0,X:1,J:0,V:1,S:1,D:0}},
];
const SEED_CLIENTS = [
  {id:"c1",name:"Isabella Martínez",phone:"+57 300 123 4567",email:"isa@email.com",bday:"1992-03-15",notes:"Prefiere rubio ceniza. Alérgica a amoniaco.",visits:8,spent:2800000,lastVisit:D0(-7),pts:280,src:"Instagram",tags:["VIP","Extensions"]},
  {id:"c2",name:"Camila Torres",phone:"+57 311 234 5678",email:"cami@email.com",bday:"1988-07-22",notes:"Tape-In cada 3 meses.",visits:12,spent:4200000,lastVisit:D0(-14),pts:420,src:"Referido",tags:["VIP","Recurrente"]},
  {id:"c3",name:"Sofía Álvarez",phone:"+57 322 345 6789",email:"sofi@email.com",bday:"1995-11-08",notes:"Primera vez mayo 2025.",visits:3,spent:760000,lastVisit:D0(-30),pts:76,src:"Google",tags:["Nueva"]},
  {id:"c4",name:"Daniela Gómez",phone:"+57 333 456 7890",email:"dani@email.com",bday:"1990-04-18",notes:"",visits:6,spent:1500000,lastVisit:D0(-5),pts:150,src:"TikTok",tags:["Extensions"]},
  {id:"c5",name:"Mariana López",phone:"+57 344 567 8901",email:"mari@email.com",bday:"1997-09-30",notes:"Turista España. Hotel NH.",visits:1,spent:480000,lastVisit:D0(-2),pts:48,src:"Hotel",tags:["Turista"]},
];
const SEED_INVENTORY = [
  {id:"i1",name:"Tape-In Rubio Ceniza 60cm",cat:"Extensiones",stock:8,min:5,cost:45000,sale:65000,unit:"paquete",supplier:"Belleza Pro"},
  {id:"i2",name:"K-Tip Natural 50cm",cat:"Extensiones",stock:3,min:5,cost:38000,sale:55000,unit:"paquete",supplier:"Belleza Pro"},
  {id:"i3",name:"Nano Pele Castaño Oscuro",cat:"Extensiones",stock:12,min:6,cost:28000,sale:42000,unit:"paquete",supplier:"HairTech"},
  {id:"i4",name:"Plex Generation 4 Kit",cat:"Biomédico",stock:2,min:3,cost:95000,sale:140000,unit:"kit",supplier:"BioMed"},
  {id:"i5",name:"Shampoo Sin Sulfatos 1L",cat:"Retail",stock:15,min:8,cost:32000,sale:58000,unit:"botella",supplier:"L'Oréal"},
  {id:"i6",name:"Mascarilla Keratina 500ml",cat:"Retail",stock:7,min:5,cost:28000,sale:50000,unit:"unidad",supplier:"L'Oréal"},
  {id:"i7",name:"Removedor Tape-In",cat:"Insumos",stock:4,min:4,cost:22000,sale:0,unit:"botella",supplier:"HairTech"},
  {id:"i8",name:"Anillas Micro Ring (200u)",cat:"Insumos",stock:6,min:3,cost:15000,sale:0,unit:"paquete",supplier:"HairTech"},
];
const SEED_PRODUCTS = [
  {id:"p1",name:"Kit Mantenimiento Tape-In",price:85000,stock:10,cat:"Kits",img:"🧴",desc:"Shampoo + mascarilla + spray sin sal. Todo para cuidar tus extensiones en casa.",active:true,featured:true,sold:23},
  {id:"p2",name:"Shampoo Sin Sulfatos 300ml",price:48000,stock:15,cat:"Cuidado",img:"🫧",desc:"Fórmula sin sulfatos ni sal. Prolonga la vida de tus extensiones.",active:true,featured:true,sold:41},
  {id:"p3",name:"Mascarilla Ultra Hidratante",price:52000,stock:8,cat:"Cuidado",img:"💧",desc:"Mascarilla nutritiva de keratina y aceite de argán. 500ml.",active:true,featured:false,sold:17},
  {id:"p4",name:"Spray Protector Térmico",price:38000,stock:12,cat:"Styling",img:"🌡️",desc:"Protege hasta 230°C. Esencial antes de usar herramientas de calor.",active:true,featured:false,sold:29},
  {id:"p5",name:"Aceite Argán Premium",price:62000,stock:6,cat:"Cuidado",img:"✨",desc:"Aceite 100% puro de Marruecos. Sella la cutícula y aporta brillo extremo.",active:true,featured:true,sold:11},
  {id:"p6",name:"Cepillo Desenredante Pro",price:45000,stock:20,cat:"Accesorios",img:"🪮",desc:"Cepillo ergonómico ideal para extensiones. No daña el punto de unión.",active:true,featured:false,sold:34},
  {id:"p7",name:"Tarjeta de Regalo $100K",price:100000,stock:999,cat:"Regalos",img:"🎁",desc:"Tarjeta de regalo Jimmy Expression. Válida para cualquier servicio.",active:true,featured:true,sold:8},
  {id:"p8",name:"Plex Home Care Kit",price:95000,stock:5,cat:"Biomédico",img:"🔬",desc:"Kit de mantenimiento en casa para tratamiento Plex G4. Uso profesional.",active:true,featured:false,sold:6},
];
const SEED_APTS = []
const SEED_SALES = []
const SEED_ORDERS = [
  {id:"o1",cid:"c1",items:[{pid:"p1",qty:1,price:85000},{pid:"p2",qty:2,price:48000}],total:181000,status:"delivered",date:D0(-5),pay:"nequi",addr:"Cra 35 #7-95 El Poblado"},
  {id:"o2",cid:"c2",items:[{pid:"p5",qty:1,price:62000}],total:62000,status:"pending",date:D0(-1),pay:"tarjeta",addr:"Cl 10 #43D-20 Laureles"},
];
const HIST = [
  {m:"Ene",rev:4200000,svcs:28,cli:22,retail:380000},
  {m:"Feb",rev:3800000,svcs:24,cli:19,retail:290000},
  {m:"Mar",rev:5100000,svcs:34,cli:28,retail:510000},
  {m:"Abr",rev:4700000,svcs:31,cli:25,retail:420000},
  {m:"May",rev:5800000,svcs:38,cli:31,retail:640000},
  {m:"Jun",rev:6200000,svcs:41,cli:35,retail:720000},
];

// ── UTILITIES ──────────────────────────────────────────────────────
const fmt = n=>new Intl.NumberFormat("es-CO",{style:"currency",currency:"COP",maximumFractionDigits:0}).format(n||0);
const fmtM = n=>n>=1000000?`$${(n/1000000).toFixed(1)}M`:`$${(n/1000).toFixed(0)}K`;
const uid = ()=>"id_"+Date.now()+"_"+Math.random().toString(36).slice(2,7);

// ── FUNCIÓN CONTABLE GLOBAL ────────────────────────────────────────
// Una sola fuente de verdad para calcular el valor de cualquier venta
// Todos los módulos (caja, nómina, finanzas, dashboard) usan esta función
const calcVenta = (s) => {
  if(!s) return 0;
  // Si ya tiene total calculado y es válido, úsalo
  if(s.total != null && +s.total > 0) return +s.total;
  const amt = +s.amount || 0;
  const tip = +s.tip || 0;
  // Descuento: en monto fijo o en porcentaje
  const disc = s.discType === "monto"
    ? Math.min(+s.disc || 0, amt)
    : amt * ((+s.disc || 0) / 100);
  return Math.max(0, amt - disc) + tip;
};
// Valor sin propina (base gravable)
const calcBase = (s) => {
  if(!s) return 0;
  const amt = +s.amount || 0;
  const disc = s.discType === "monto"
    ? Math.min(+s.disc || 0, amt)
    : amt * ((+s.disc || 0) / 100);
  return Math.max(0, amt - disc);
};
const DAYS = ["L","M","X","J","V","S","D"];
const PAY_METHODS = ["efectivo","tarjeta","nequi","transferencia","daviplata","mixto"];
const STATUS = {
  confirmed:{l:"Confirmada",c:C.green,b:C.greenD},
  pending:{l:"Pendiente",c:C.orange,b:C.orangeD},
  completed:{l:"Completada",c:C.blue,b:C.blueD},
  cancelled:{l:"Cancelada",c:C.red,b:C.redD},
  "no-show":{l:"No se presentó",c:C.muted,b:C.subtle},
};
const ORDER_STATUS = {
  pending:{l:"Pendiente",c:C.orange},
  processing:{l:"Procesando",c:C.blue},
  shipped:{l:"Enviado",c:C.purple},
  delivered:{l:"Entregado",c:C.green},
  cancelled:{l:"Cancelado",c:C.red},
};

// ── CLOUD STORAGE HELPERS ──────────────────────────────────────────
// ── SUPABASE CONFIG ────────────────────────────────────────────────
const SUPA_URL = "https://ayettxkzesvdfzsuofrw.supabase.co";
const SUPA_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF5ZXR0eGt6ZXN2ZGZ6c3VvZnJ3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODM1NTEzNzUsImV4cCI6MjA5OTEyNzM3NX0.qCq_aHOiT2n4KJyzfFF17udVmX3VhgK_iJ48LzIJY7c";
const SUPA_HEADERS = {
  "Content-Type": "application/json",
  "apikey": SUPA_KEY,
  "Authorization": `Bearer ${SUPA_KEY}`,
  "Prefer": "return=minimal",
};

const saveCloud = async (data) => {
  try {
    // Upsert into je_data table, row id = 'main'
    const payload = {
      id: "main",
      apts: data.apts || [],
      clients: data.clients || [],
      svcs: data.svcs || [],
      staff: data.staff || [],
      inv: data.inv || [],
      sales: data.sales || [],
      products: data.products || [],
      orders: data.orders || [],
      caja: data.caja || {},
      empresa: data.empresa || {},
      movimientos: data.movimientos || [],
      usuarios: data.usuarios || [],
      updated_at: new Date().toISOString(),
    };
    const res = await fetch(`${SUPA_URL}/rest/v1/je_data?id=eq.main`, {
      method: "PATCH",
      headers: SUPA_HEADERS,
      body: JSON.stringify(payload),
    });
    // If row doesn't exist yet, insert it
    if (res.status === 404 || res.status === 406) {
      await fetch(`${SUPA_URL}/rest/v1/je_data`, {
        method: "POST",
        headers: { ...SUPA_HEADERS, "Prefer": "return=minimal" },
        body: JSON.stringify(payload),
      });
    }
  } catch(e) { console.error("Supabase save error:", e); }
};

const loadCloud = async () => {
  try {
    const res = await fetch(`${SUPA_URL}/rest/v1/je_data?id=eq.main&select=*`, {
      method: "GET",
      headers: SUPA_HEADERS,
    });
    if (!res.ok) return null;
    const rows = await res.json();
    if (!rows || rows.length === 0) return null;
    const row = rows[0];
    return {
      apts:        row.apts        || [],
      clients:     row.clients     || [],
      svcs:        row.svcs        || [],
      staff:       row.staff       || [],
      inv:         row.inv         || [],
      sales:       row.sales       || [],
      products:    row.products    || [],
      orders:      row.orders      || [],
      caja:        row.caja        || {},
      empresa:     row.empresa     || {},
      movimientos: row.movimientos || [],
      usuarios:    row.usuarios    || [],
    };
  } catch(e) { console.error("Supabase load error:", e); return null; }
};

// ── SHARED UI ──────────────────────────────────────────────────────
const sx = {
  card:{background:C.card,border:`1px solid ${C.border}`,borderRadius:12},
  inp:{background:C.surface,border:`1px solid ${C.border}`,borderRadius:7,padding:"9px 12px",color:C.cream,fontSize:13,width:"100%",boxSizing:"border-box",outline:"none"},
  lbl:{color:C.muted,fontSize:10,letterSpacing:1.2,textTransform:"uppercase",marginBottom:5,display:"block"},
  btn:{background:C.gold,color:C.bg,border:"none",borderRadius:7,padding:"9px 18px",fontSize:13,fontWeight:700,cursor:"pointer"},
  ghost:{background:"transparent",color:C.muted,border:`1px solid ${C.border}`,borderRadius:7,padding:"9px 18px",fontSize:13,cursor:"pointer"},
  danger:{background:C.redD,color:C.red,border:`1px solid ${C.red}44`,borderRadius:7,padding:"9px 18px",fontSize:13,cursor:"pointer"},
  green:{background:C.green,color:"#fff",border:"none",borderRadius:7,padding:"9px 18px",fontSize:13,fontWeight:700,cursor:"pointer"},
};
function Inp(p){return <input {...p} style={{...sx.inp,...p.style}}/>;}
function Sel({children,...p}){return <select {...p} style={{...sx.inp,...p.style}}>{children}</select>;}
function Txta(p){return <textarea {...p} style={{...sx.inp,...p.style,resize:"vertical",minHeight:76}}/>;}
function Fld({lbl,children}){return <div><label style={sx.lbl}>{lbl}</label>{children}</div>;}
function Row({children,cols=2}){return <div style={{display:"grid",gridTemplateColumns:`repeat(${cols},1fr)`,gap:12,marginBottom:12}}>{children}</div>;}
function Badge({c,bg,children,sm}){return <span style={{background:bg||c+"22",color:c,border:`1px solid ${c}44`,borderRadius:4,padding:sm?"1px 6px":"2px 8px",fontSize:sm?10:11,fontWeight:700,letterSpacing:0.5,textTransform:"uppercase",whiteSpace:"nowrap"}}>{children}</span>;}
function Divider(){return <div style={{height:1,background:`linear-gradient(90deg,transparent,${C.gold}55,transparent)`,margin:"18px 0"}}/>;}
function Ava({name,color,size=36}){return <div style={{width:size,height:size,borderRadius:"50%",background:color+"22",border:`2px solid ${color}`,display:"flex",alignItems:"center",justifyContent:"center",color,fontWeight:800,fontSize:size*.38,flexShrink:0}}>{name?.charAt(0)||"?"}</div>;}
function Toast({msg,type}){const cl=type==="error"?C.red:type==="warn"?C.orange:C.green;return <div style={{position:"fixed",bottom:24,right:24,background:C.card,border:`1px solid ${cl}`,borderRadius:10,padding:"12px 20px",color:cl,fontWeight:600,fontSize:13,zIndex:3000,boxShadow:"0 8px 32px #000A"}}>{msg}</div>;}
function Modal({title,onClose,children,w=600}){return(
  <div style={{position:"fixed",inset:0,background:"#000000CC",zIndex:2000,display:"flex",alignItems:"center",justifyContent:"center",padding:16,overflowY:"auto"}}>
    <div style={{...sx.card,width:"100%",maxWidth:w,maxHeight:"92vh",overflow:"auto",padding:0,margin:"auto"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"16px 24px",borderBottom:`1px solid ${C.border}`,position:"sticky",top:0,background:C.card,zIndex:1}}>
        <span style={{color:C.cream,fontWeight:700,fontSize:15}}>{title}</span>
        <button onClick={onClose} style={{background:"transparent",border:"none",color:C.muted,fontSize:24,cursor:"pointer",lineHeight:1}}>×</button>
      </div>
      <div style={{padding:24}}>{children}</div>
    </div>
  </div>
);}
function BarM({data,ky,color}){const mx=Math.max(...data.map(d=>d[ky]),1);return(
  <div style={{display:"flex",alignItems:"flex-end",gap:5,height:68}}>
    {data.map((d,i)=>(
      <div key={i} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:3}}>
        <div style={{width:"100%",background:i===data.length-1?color:color+"44",height:Math.max(3,(d[ky]/mx)*56),borderRadius:"3px 3px 0 0"}}/>
        <span style={{color:C.muted,fontSize:9}}>{d.m}</span>
      </div>
    ))}
  </div>
);}
function KPI({label,value,sub,accent,icon}){return(
  <div style={{...sx.card,padding:"16px 18px"}}>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:6}}>
      <div style={{color:C.muted,fontSize:10,letterSpacing:1.5,textTransform:"uppercase"}}>{label}</div>
      {icon&&<span style={{fontSize:15}}>{icon}</span>}
    </div>
    <div style={{color:accent||C.goldL,fontSize:22,fontWeight:800,letterSpacing:-0.5}}>{value}</div>
    {sub&&<div style={{color:C.muted,fontSize:11,marginTop:3}}>{sub}</div>}
  </div>
);}
// ── DASHBOARD ──────────────────────────────────────────────────────
function Dashboard({apts,sales,clients,inv,svcs,staff,orders,movimientos,empresa}){
  const todayA=apts.filter(a=>a.date===TODAY);
  const todayS=sales.filter(s=>s.date===TODAY);
  const weekS=sales.filter(s=>s.date>=D0(-7)&&s.date<=TODAY);
  const monthS=sales.filter(s=>new Date(s.date).getMonth()===new Date().getMonth());
  const rev=todayS.reduce((a,b)=>a+calcVenta(b),0);
  const revWeek=weekS.reduce((a,b)=>a+calcVenta(b),0);
  const revMonth=monthS.reduce((a,b)=>a+calcVenta(b),0);
  const low=inv.filter(i=>i.stock<=i.min);
  const pendOrd=orders.filter(o=>o.status==="pending").length;
  const nextApts=[...apts].filter(a=>a.date>=TODAY&&a.status!=="cancelled")
    .sort((a,b)=>(a.date+a.time).localeCompare(b.date+b.time)).slice(0,8);
  const births=clients.filter(c=>{
    if(!c.bday)return false;
    const b=new Date(c.bday),t=new Date(TODAY);
    return b.getMonth()===t.getMonth()&&Math.abs(b.getDate()-t.getDate())<=4;
  });
  const vipClients=clients.filter(c=>c.pts>=300).length;
  const pendOnline=apts.filter(a=>a.online&&a.status==="pending").length;
  const citasCompletadas=todayA.filter(a=>a.status==="completed").length;
  const citasCanceladas=todayA.filter(a=>a.status==="cancelled").length;
  const ocupacion=todayA.length>0?Math.round((citasCompletadas/todayA.length)*100):0;
  const avgTicket=todayS.length>0?rev/todayS.length:0;

  // Rendimiento por estilista hoy
  const staffPerf=staff.filter(s=>s.active).map(st=>{
    const stApts=todayA.filter(a=>a.tid===st.id);
    const stSales=todayS.filter(s=>s.tid===st.id);
    const stRev=stSales.reduce((a,b)=>a+calcVenta(b),0);
    return{...st,apts:stApts.length,rev:stRev,comp:stApts.filter(a=>a.status==="completed").length};
  });

  // Gastos del mes
  const gastosM=(movimientos||[]).filter(m=>new Date(m.fecha).getMonth()===new Date().getMonth()&&m.tipo==="gasto"&&!m.archivado)
    .reduce((a,b)=>a+b.monto,0);
  const utilidad=revMonth-gastosM;

  return(
    <div>
      {/* Saludo + fecha */}
      <div style={{marginBottom:18,display:"flex",justifyContent:"space-between",alignItems:"flex-start",flexWrap:"wrap",gap:8}}>
        <div>
          <div style={{color:C.goldL,fontWeight:800,fontSize:20}}>
            {new Date().getHours()<12?"Buenos días":"Buenas "+(new Date().getHours()<19?"tardes":"noches")}, {empresa?.nombre||"Jimmy Expression"} 👋
          </div>
          <div style={{color:C.muted,fontSize:12,marginTop:2}}>
            {new Date().toLocaleDateString("es-CO",{weekday:"long",day:"numeric",month:"long",year:"numeric"})}
          </div>
        </div>
        {pendOnline>0&&(
          <div style={{background:C.orangeD,border:`1px solid ${C.orange}44`,borderRadius:8,padding:"8px 14px",display:"flex",alignItems:"center",gap:8}}>
            <span style={{fontSize:16}}>🔔</span>
            <span style={{color:C.orange,fontWeight:700,fontSize:13}}>{pendOnline} cita(s) online pendientes de confirmar</span>
          </div>
        )}
      </div>

      {/* KPIs fila 1 — Hoy */}
      <div style={{color:C.muted,fontSize:10,textTransform:"uppercase",letterSpacing:1.5,marginBottom:8}}>Resumen del día</div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(140px,1fr))",gap:10,marginBottom:18}}>
        <KPI label="Citas hoy" value={todayA.length} sub={`${citasCompletadas} completadas · ${citasCanceladas} canceladas`} accent={C.gold} icon="📅"/>
        <KPI label="Ingresos hoy" value={fmtM(rev)} sub={`Ticket promedio ${fmt(avgTicket)}`} accent={C.green} icon="💵"/>
        <KPI label="Ocupación" value={`${ocupacion}%`} sub={`${todayA.filter(a=>a.status==="confirmed").length} confirmadas`} accent={ocupacion>70?C.green:ocupacion>40?C.orange:C.red} icon="📊"/>
        <KPI label="Stock crítico" value={low.length} sub="ítems bajo mínimo" accent={low.length>0?C.red:C.muted} icon="⚠️"/>
        {pendOrd>0&&<KPI label="Pedidos online" value={pendOrd} sub="sin procesar" accent={C.orange} icon="🛍️"/>}
        <KPI label="Clientes VIP" value={vipClients} sub="300+ puntos" accent={C.purple} icon="👑"/>
      </div>

      {/* KPIs fila 2 — Semana / Mes */}
      <div style={{color:C.muted,fontSize:10,textTransform:"uppercase",letterSpacing:1.5,marginBottom:8}}>Semana y mes</div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(140px,1fr))",gap:10,marginBottom:18}}>
        <KPI label="Ingresos semana" value={fmtM(revWeek)} sub="últimos 7 días" accent={C.gold} icon="📆"/>
        <KPI label="Ingresos mes" value={fmtM(revMonth)} sub={`${monthS.length} ventas`} accent={C.goldL} icon="📈"/>
        <KPI label="Gastos mes" value={fmtM(gastosM)} sub="registrados" accent={C.orange} icon="💸"/>
        <KPI label="Utilidad mes" value={fmtM(utilidad)} sub={utilidad>=0?"positiva ✓":"revisar ⚠"} accent={utilidad>=0?C.green:C.red} icon={utilidad>=0?"📈":"📉"}/>
        <KPI label="Total clientes" value={clients.length} sub={`${births.length} cumplen años pronto`} accent={C.blue} icon="👥"/>
        <KPI label="Ventas semana" value={weekS.length} sub="transacciones" accent={C.purple} icon="🧾"/>
      </div>

      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14,marginBottom:14}}>
        {/* Próximas citas */}
        <div style={{...sx.card,padding:18}}>
          <div style={{color:C.muted,fontSize:10,letterSpacing:1.5,textTransform:"uppercase",marginBottom:14,display:"flex",justifyContent:"space-between"}}>
            <span>Próximas citas</span>
            <span style={{color:C.gold}}>{nextApts.length} total</span>
          </div>
          {nextApts.length===0&&<div style={{color:C.muted,padding:20,textAlign:"center",fontSize:13}}>Sin citas próximas 🎉</div>}
          {nextApts.map((apt,i)=>{
            const svc=svcs.find(s=>s.id===apt.sid);
            const svcNames=(apt.sids||[apt.sid]).map(id=>svcs.find(s=>s.id===id)?.name).filter(Boolean).join(" + ")||svc?.name||"—";
            const cli=clients.find(c=>c.id===apt.cid);
            const st=staff.find(s=>s.id===apt.tid);
            const sc=STATUS[apt.status]||STATUS.pending;
            return(
              <div key={apt.id} style={{display:"flex",alignItems:"center",gap:10,padding:"9px 0",borderBottom:i<nextApts.length-1?`1px solid ${C.border}22`:"none"}}>
                <div style={{minWidth:44,textAlign:"center",flexShrink:0}}>
                  <div style={{color:C.gold,fontWeight:800,fontSize:14}}>{apt.time}</div>
                  <div style={{color:C.muted,fontSize:9}}>{apt.date===TODAY?"Hoy":apt.date.slice(5)}</div>
                </div>
                <Ava name={cli?.name||"?"} color={st?.color||C.gold} size={28}/>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{color:C.cream,fontWeight:600,fontSize:12,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{cli?.name||apt.clientName||"—"}</div>
                  <div style={{color:C.muted,fontSize:10,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{svcNames}{svc?.duration?` · ⏱${svc.duration}min`:""}</div>
                  <div style={{color:st?.color||C.muted,fontSize:10}}>{st?.name||"Sin asignar"}</div>
                </div>
                <Badge c={sc.c} bg={sc.b} sm>{sc.l}</Badge>
              </div>
            );
          })}
        </div>

        {/* Panel derecho */}
        <div style={{display:"flex",flexDirection:"column",gap:10}}>
          {/* Rendimiento staff hoy */}
          <div style={{...sx.card,padding:16}}>
            <div style={{color:C.muted,fontSize:10,letterSpacing:1.5,textTransform:"uppercase",marginBottom:12}}>Rendimiento staff — hoy</div>
            {staffPerf.map(st=>(
              <div key={st.id} style={{display:"flex",alignItems:"center",gap:10,marginBottom:10}}>
                <Ava name={st.name} color={st.color} size={30}/>
                <div style={{flex:1}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:3}}>
                    <span style={{color:C.cream,fontSize:12,fontWeight:600}}>{st.name}</span>
                    <span style={{color:C.green,fontWeight:700,fontSize:12}}>{fmt(st.rev)}</span>
                  </div>
                  <div style={{display:"flex",gap:6,alignItems:"center"}}>
                    <div style={{flex:1,height:4,background:C.border,borderRadius:2}}>
                      <div style={{width:st.apts>0?`${Math.min(100,(st.comp/st.apts)*100)}%`:"0%",height:"100%",background:st.color,borderRadius:2,transition:"width .4s"}}/>
                    </div>
                    <span style={{color:C.muted,fontSize:10,flexShrink:0}}>{st.comp}/{st.apts} citas</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Alertas */}
          {low.length>0&&(
            <div style={{...sx.card,padding:14,border:`1px solid ${C.red}44`,background:C.redD}}>
              <div style={{color:C.red,fontWeight:700,fontSize:12,marginBottom:8}}>⚠ Stock crítico — {low.length} ítems</div>
              {low.slice(0,4).map(i=>(
                <div key={i.id} style={{display:"flex",justifyContent:"space-between",fontSize:11,padding:"3px 0",borderBottom:`1px solid ${C.border}22`}}>
                  <span style={{color:C.cream,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",maxWidth:150}}>{i.name}</span>
                  <span style={{color:C.red,fontWeight:700,flexShrink:0}}>Stock:{i.stock} / Mín:{i.min}</span>
                </div>
              ))}
            </div>
          )}

          {births.length>0&&(
            <div style={{...sx.card,padding:14,border:`1px solid ${C.rose}44`,background:C.roseD}}>
              <div style={{color:C.rose,fontWeight:700,fontSize:12,marginBottom:8}}>🎂 Cumpleaños próximos</div>
              {births.map(c=>(
                <div key={c.id} style={{display:"flex",justifyContent:"space-between",fontSize:12,padding:"2px 0"}}>
                  <span style={{color:C.cream}}>{c.name}</span>
                  <span style={{color:C.rose}}>{c.bday?.slice(5)}</span>
                </div>
              ))}
            </div>
          )}

          {/* Gráfico ingresos */}
          <div style={{...sx.card,padding:14}}>
            <div style={{color:C.muted,fontSize:10,letterSpacing:1.5,textTransform:"uppercase",marginBottom:10}}>Ingresos por mes</div>
            <BarM data={HIST} ky="rev" color={C.gold}/>
          </div>
        </div>
      </div>

      {/* Ventas de hoy — tabla rápida */}
      {todayS.length>0&&(
        <div style={{...sx.card,padding:18}}>
          <div style={{color:C.muted,fontSize:10,letterSpacing:1.5,textTransform:"uppercase",marginBottom:12}}>Ventas de hoy — {todayS.length} transacciones</div>
          <div style={{overflowX:"auto"}}>
            <table style={{width:"100%",borderCollapse:"collapse",fontSize:12}}>
              <thead><tr style={{borderBottom:`1px solid ${C.border}`}}>
                {["Cliente","Servicio","Estilista","Método","Total"].map(h=>(
                  <th key={h} style={{color:C.muted,fontSize:9,letterSpacing:1,textTransform:"uppercase",padding:"6px 10px",textAlign:"left"}}>{h}</th>
                ))}
              </tr></thead>
              <tbody>
                {todayS.map((s,i)=>{
                  const cli=clients.find(c=>c.id===s.cid);
                  const svc=svcs.find(x=>x.id===s.sid);
                  const st=staff.find(x=>x.id===s.tid);
                  return(
                    <tr key={s.id} style={{borderBottom:i<todayS.length-1?`1px solid ${C.border}22`:"none"}}>
                      <td style={{padding:"7px 10px",color:C.cream}}>{cli?.name||"—"}</td>
                      <td style={{padding:"7px 10px",color:C.muted}}>{svc?.name||s.notes||"—"}</td>
                      <td style={{padding:"7px 10px"}}><span style={{color:st?.color||C.muted}}>{st?.name||"—"}</span></td>
                      <td style={{padding:"7px 10px"}}><Badge c={C.blue} sm>{s.pay||"—"}</Badge></td>
                      <td style={{padding:"7px 10px",color:C.green,fontWeight:700}}>{fmt(calcVenta(s))}</td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot><tr style={{borderTop:`1px solid ${C.gold}44`}}>
                <td colSpan={4} style={{padding:"8px 10px",color:C.gold,fontWeight:700,fontSize:11,textTransform:"uppercase"}}>Total del día</td>
                <td style={{padding:"8px 10px",color:C.green,fontWeight:800,fontSize:15}}>{fmt(rev)}</td>
              </tr></tfoot>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}


// ── AGENDA ─────────────────────────────────────────────────────────
function Agenda({apts,setApts,clients,svcs,staff,toast,empresa}){
  const [view,setView]=useState("day");
  const [sel,setSel]=useState(D0(0)); // siempre inicia en hoy
  const [fStaff,setFS]=useState("all");
  const [modal,setModal]=useState(null);
  const hours=Array.from({length:13},(_,i)=>i+7);
  const go=n=>{const d=new Date(sel);d.setDate(d.getDate()+n);setSel(d.toISOString().split("T")[0]);};
  const wStart=new Date(sel);wStart.setDate(wStart.getDate()-wStart.getDay()+1);
  const wDates=Array.from({length:7},(_,i)=>{const d=new Date(wStart);d.setDate(d.getDate()+i);return d.toISOString().split("T")[0];});
  const dayA=apts.filter(a=>a.date===sel&&(fStaff==="all"||a.tid===fStaff)).sort((a,b)=>a.time.localeCompare(b.time));

  function ACard({apt}){
    const svc=svcs.find(s=>s.id===apt.sid),cli=clients.find(c=>c.id===apt.cid),st=staff.find(s=>s.id===apt.tid),sc=STATUS[apt.status]||STATUS.pending;
    return(
      <div onClick={()=>setModal({type:"edit",apt})} style={{...sx.card,padding:"12px 16px",marginBottom:8,borderLeft:`3px solid ${svc?.color||C.gold}`,cursor:"pointer",transition:"background .15s"}} onMouseEnter={e=>e.currentTarget.style.background=C.hover} onMouseLeave={e=>e.currentTarget.style.background=C.card}>
        <div style={{display:"flex",justifyContent:"space-between",marginBottom:3}}>
          <span style={{color:C.gold,fontWeight:700}}>{apt.time}{apt.end&&<span style={{color:C.muted,fontWeight:400}}> – {apt.end}</span>}</span>
          <Badge c={sc.c} bg={sc.b} sm>{sc.l}</Badge>
        </div>
        <div style={{color:C.cream,fontWeight:700}}>{cli?.name||"Cliente"}</div>
        <div style={{color:C.muted,fontSize:12,marginTop:2}}>{svc?.name} · <span style={{color:st?.color}}>{st?.name}</span></div>
        {apt.notes&&<div style={{color:C.muted,fontSize:11,marginTop:3,fontStyle:"italic"}}>"{apt.notes}"</div>}
        {apt.dep>0&&<div style={{color:C.green,fontSize:11,marginTop:3}}>Anticipo: {fmt(apt.dep)}</div>}
        <div style={{marginTop:6,display:"flex",gap:6}}>
          <BtnGoogleCal apt={apt} clients={clients} svcs={svcs} empresa={empresa}/>
        </div>
      </div>
    );
  }

  return(
    <div>
      <div style={{display:"flex",gap:8,marginBottom:18,flexWrap:"wrap",justifyContent:"space-between",alignItems:"center"}}>
        <div style={{display:"flex",gap:6,alignItems:"center"}}>
          <button onClick={()=>go(-1)} style={{...sx.ghost,padding:"7px 12px"}}>←</button>
          <button onClick={()=>setSel(TODAY)} style={{...sx.ghost,padding:"7px 12px",fontSize:12}}>Hoy</button>
          <button onClick={()=>go(1)} style={{...sx.ghost,padding:"7px 12px"}}>→</button>
          <input type="date" value={sel} onChange={e=>setSel(e.target.value)} style={{...sx.inp,width:148}}/>
        </div>
        <div style={{display:"flex",gap:6,alignItems:"center"}}>
          <Sel value={fStaff} onChange={e=>setFS(e.target.value)} style={{width:160}}>
            <option value="all">Todos los estilistas</option>
            {staff.filter(s=>s.active).map(s=><option key={s.id} value={s.id}>{s.name}</option>)}
          </Sel>
          {["day","week","list"].map(v=>(
            <button key={v} onClick={()=>setView(v)} style={{...(view===v?sx.btn:sx.ghost),padding:"7px 12px",fontSize:11}}>
              {v==="day"?"Día":v==="week"?"Semana":"Lista"}
            </button>
          ))}
          <button style={sx.btn} onClick={()=>setModal({type:"new",date:sel})}>+ Nueva cita</button>
        </div>
      </div>

      {view==="day"&&(
        <div>
          <div style={{color:C.cream,fontWeight:700,fontSize:17,marginBottom:14}}>
            {new Date(sel+"T00:00:00").toLocaleDateString("es-CO",{weekday:"long",day:"numeric",month:"long"})}
            <span style={{color:C.muted,fontWeight:400,fontSize:14,marginLeft:10}}>{dayA.length} citas</span>
          </div>
          <div style={{display:"flex",gap:0}}>
            <div style={{width:48,flexShrink:0,paddingTop:2}}>
              {hours.map(h=><div key={h} style={{height:70,display:"flex",alignItems:"flex-start",paddingTop:2,color:C.muted,fontSize:10}}>{h}:00</div>)}
            </div>
            <div style={{flex:1,borderLeft:`1px solid ${C.border}`}}>
              {hours.map(h=>{
                const hApts=dayA.filter(a=>parseInt(a.time)===h);
                return(
                  <div key={h} style={{height:70,borderBottom:`1px solid ${C.border}11`,position:"relative",display:"flex",gap:4,padding:"2px 4px"}}>
                    {hApts.map(apt=>{
                      const svc=svcs.find(s=>s.id===apt.sid),cli=clients.find(c=>c.id===apt.cid),st=staff.find(s=>s.id===apt.tid);
                      const dur=(svc?.duration||60)/60;
                      return(
                        <div key={apt.id} onClick={()=>setModal({type:"edit",apt})} style={{flex:1,background:svc?.color+"22",border:`1px solid ${svc?.color||C.gold}66`,borderRadius:6,padding:"3px 8px",cursor:"pointer",overflow:"hidden",height:Math.max(30,dur*68)-4}}>
                          <div style={{color:svc?.color||C.gold,fontWeight:700,fontSize:11}}>{apt.time} {cli?.name}</div>
                          <div style={{color:C.muted,fontSize:10}}>{st?.name}</div>
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {view==="week"&&(
        <div style={{overflowX:"auto"}}>
          <div style={{display:"grid",gridTemplateColumns:"44px repeat(7,1fr)",minWidth:680}}>
            <div/>
            {wDates.map(d=>(
              <div key={d} onClick={()=>{setSel(d);setView("day");}} style={{textAlign:"center",padding:"8px 4px",borderBottom:`2px solid ${d===TODAY?C.gold:C.border}`,cursor:"pointer"}}>
                <div style={{color:C.muted,fontSize:10,textTransform:"uppercase"}}>{new Date(d+"T00:00:00").toLocaleDateString("es-CO",{weekday:"short"})}</div>
                <div style={{color:d===TODAY?C.gold:C.cream,fontWeight:d===TODAY?800:400,fontSize:16}}>{new Date(d+"T00:00:00").getDate()}</div>
                <div style={{width:5,height:5,borderRadius:"50%",background:apts.filter(a=>a.date===d).length>0?C.gold:"transparent",margin:"2px auto"}}/>
              </div>
            ))}
            {hours.slice(0,10).map(h=>[
              <div key={"h"+h} style={{height:44,display:"flex",alignItems:"flex-start",paddingTop:2,color:C.muted,fontSize:9,paddingRight:4,textAlign:"right"}}>{h}:00</div>,
              ...wDates.map(d=>(
                <div key={d} style={{height:44,borderLeft:`1px solid ${C.border}22`,borderBottom:`1px solid ${C.border}11`,position:"relative"}}>
                  {apts.filter(a=>a.date===d&&parseInt(a.time)===h).map(apt=>{
                    const svc=svcs.find(s=>s.id===apt.sid),cli=clients.find(c=>c.id===apt.cid);
                    return(
                      <div key={apt.id} onClick={()=>{setSel(d);setView("day");}} style={{position:"absolute",inset:2,background:svc?.color+"22",border:`1px solid ${svc?.color||C.gold}55`,borderRadius:4,padding:"1px 4px",cursor:"pointer",overflow:"hidden"}}>
                        <div style={{color:svc?.color||C.gold,fontSize:9,fontWeight:700,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{cli?.name}</div>
                      </div>
                    );
                  })}
                </div>
              ))
            ])}
          </div>
        </div>
      )}

      {view==="list"&&(
        <div>
          {Array.from({length:14},(_,i)=>{
            const d=new Date(TODAY);d.setDate(d.getDate()+i);const ds=d.toISOString().split("T")[0];
            const da=apts.filter(a=>a.date===ds&&(fStaff==="all"||a.tid===fStaff));
            if(!da.length)return null;
            return(
              <div key={ds} style={{marginBottom:18}}>
                <div style={{color:ds===TODAY?C.gold:C.cream,fontWeight:700,fontSize:14,marginBottom:10,display:"flex",gap:10,alignItems:"center"}}>
                  {new Date(ds+"T00:00:00").toLocaleDateString("es-CO",{weekday:"long",day:"numeric",month:"long"})}
                  {ds===TODAY&&<Badge c={C.gold} sm>Hoy</Badge>}
                </div>
                {da.sort((a,b)=>a.time.localeCompare(b.time)).map(apt=><ACard key={apt.id} apt={apt}/>)}
              </div>
            );
          })}
        </div>
      )}

      {modal&&<AptModal type={modal.type} apt={modal.apt} defaultDate={modal.date||sel} clients={clients} setClients={setClients} svcs={svcs} staff={staff} apts={apts} setApts={setApts} onClose={()=>setModal(null)} toast={toast} empresa={empresa}/>}
    </div>
  );
}

function AptModal({type,apt,defaultDate,clients,setClients,svcs,staff,apts,setApts,onClose,toast,empresa}){
  const COUNTRY_CODES=["+57 🇨🇴","+1 🇺🇸","+34 🇪🇸","+52 🇲🇽","+54 🇦🇷","+55 🇧🇷","+44 🇬🇧","+49 🇩🇪","+33 🇫🇷","+39 🇮🇹"];
  const blank={cid:"nuevo",sid:"s1",sids:["s1"],tid:"auto",date:defaultDate||TODAY,time:"09:00",end:"10:00",status:"confirmed",notes:"",dep:0,paid:false,clienteNuevo:{name:"",phone:"",countryCode:"+57 🇨🇴",email:""}};
  const [f,setF]=useState(apt?{...apt,sids:apt.sids||[apt.sid||"s1"],tid:apt.tid||"auto"}:blank);
  const set=(k,v)=>setF(p=>({...p,[k]:v}));
  const setCN=(k,v)=>setF(p=>({...p,clienteNuevo:{...(p.clienteNuevo||{}), [k]:v}}));

  // Auto-calcular hora fin basado en servicio(s)
  const totalDur=f.sids?.reduce((a,sid)=>{const s=svcs.find(x=>x.id===sid);return a+(s?.duration||60);},0)||60;
  useEffect(()=>{
    if(f.time){
      const [h,m]=f.time.split(":").map(Number);
      const e=new Date(2000,0,1,h,m+totalDur);
      set("end",`${String(e.getHours()).padStart(2,"0")}:${String(e.getMinutes()).padStart(2,"0")}`);
    }
  },[f.time,JSON.stringify(f.sids)]);

  // Asignación automática de estilista
  const getAutoStaff=()=>{
    if(!f.date||!f.time) return staff.filter(s=>s.active)[0]?.id;
    const ocupados=apts.filter(a=>a.date===f.date&&a.time===f.time&&a.status!=="cancelled").map(a=>a.tid);
    const disponible=staff.filter(s=>s.active&&!ocupados.includes(s.id));
    return disponible[0]?.id||staff.filter(s=>s.active)[0]?.id;
  };
  const staffAsignado=f.tid==="auto"?getAutoStaff():f.tid;
  const stfInfo=staff.find(s=>s.id===staffAsignado);

  const toggleSvc=(sid)=>{
    const cur=f.sids||[];
    if(cur.includes(sid)){if(cur.length>1)set("sids",cur.filter(x=>x!==sid));}
    else{set("sids",[...cur,sid]);}
  };
  const totalPrecio=(f.sids||[]).reduce((a,sid)=>{const s=svcs.find(x=>x.id===sid);return a+(s?.price||0);},0);

  const save=()=>{
    if(!f.date||!f.time){toast("Fecha y hora son requeridos","error");return;}
    if(f.cid==="nuevo"&&!(f.clienteNuevo?.name)){toast("Ingresa el nombre del cliente","error");return;}
    // Si es cliente nuevo → crearlo en la lista de clientes automáticamente
    let cid=f.cid;
    if(f.cid==="nuevo"&&f.clienteNuevo?.name){
      const nuevoCliente={
        id:uid(),
        name:f.clienteNuevo.name,
        phone:(f.clienteNuevo.countryCode||"+57").replace(/[^+\d]/g,"")+f.clienteNuevo.phone?.replace(/\D/g,""),
        email:f.clienteNuevo.email||"",
        bday:"",notes:"",src:"Agenda",tags:[],
        pts:0,visits:1,spent:0,lastVisit:f.date
      };
      setClients(p=>[...p,nuevoCliente]);
      cid=nuevoCliente.id;
      toast("Cliente creado y guardado automáticamente ✓");
    }
    const savedApt={...f,cid,sid:f.sids?.[0]||"s1",sids:f.sids||["s1"],tid:staffAsignado,id:apt?.id||uid()};
    if(type==="edit"){setApts(p=>p.map(a=>a.id===apt.id?savedApt:a));}
    else{setApts(p=>[...p,savedApt]);}
    toast(type==="edit"?"Cita actualizada":"Cita agendada ✓");onClose();
  };
  const del=()=>{setApts(p=>p.filter(a=>a.id!==apt.id));toast("Cita eliminada","warn");onClose();};

  // GCal URL
  const gcalUrl=()=>{
    const svcName=(f.sids||[]).map(sid=>svcs.find(s=>s.id===sid)?.name).filter(Boolean).join(" + ");
    const cliName=f.cid==="nuevo"?(f.clienteNuevo?.name||"Cliente"):clients.find(c=>c.id===f.cid)?.name||"Cliente";
    const [h,mm]=f.time.split(":").map(Number);
    const start=f.date?.replace(/-/g,"")+`T${String(h).padStart(2,"0")}${String(mm).padStart(2,"0")}00`;
    const endD=new Date(`${f.date}T${f.time}:00`);endD.setMinutes(endD.getMinutes()+totalDur);
    const end=f.date?.replace(/-/g,"")+`T${String(endD.getHours()).padStart(2,"0")}${String(endD.getMinutes()).padStart(2,"0")}00`;
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(svcName+" — "+cliName)}&dates=${start}/${end}&location=${encodeURIComponent(empresa?.direccion||"Pinar del Rio Mall, El Poblado, Medellin")}&details=${encodeURIComponent("Cliente: "+cliName+"\nServicio: "+svcName+"\nEstilista: "+(stfInfo?.name||"—")+"\nTotal: "+fmt(totalPrecio))}`;
  };

  return(
    <Modal title={type==="edit"?"Editar cita":"Nueva cita"} onClose={onClose} w={640}>
      {/* CLIENTE */}
      <div style={{...sx.card,padding:14,marginBottom:12,border:`1px solid ${C.border}`}}>
        <div style={{color:C.muted,fontSize:10,textTransform:"uppercase",letterSpacing:1.2,marginBottom:10}}>Cliente</div>
        <Row>
          <Fld lbl="Seleccionar cliente">
            <Sel value={f.cid} onChange={e=>set("cid",e.target.value)}>
              <option value="nuevo">➕ Nuevo cliente (llenar abajo)</option>
              {clients.map(c=><option key={c.id} value={c.id}>{c.name} · {c.phone}</option>)}
            </Sel>
          </Fld>
          <Fld lbl="Estilista preferido">
            <Sel value={f.tid} onChange={e=>set("tid",e.target.value)}>
              <option value="auto">🎲 Automático (según disponibilidad)</option>
              <option value="empresa">🏢 Asignar en salón</option>
              {staff.filter(s=>s.active).map(s=><option key={s.id} value={s.id}>{s.name} — {s.role}</option>)}
            </Sel>
          </Fld>
        </Row>
        {f.tid==="auto"&&stfInfo&&(
          <div style={{...sx.card,padding:8,background:C.greenD,border:`1px solid ${C.green}44`,marginTop:-4}}>
            <span style={{color:C.green,fontSize:12}}>✓ Asignado automáticamente: <b>{stfInfo.name}</b> (disponible en ese horario)</span>
          </div>
        )}
        {f.tid==="empresa"&&(
          <div style={{...sx.card,padding:8,background:C.blueD,border:`1px solid ${C.blue}44`,marginTop:-4}}>
            <span style={{color:C.blue,fontSize:12}}>🏢 El salón asignará el estilista al momento de la cita</span>
          </div>
        )}
        {f.cid==="nuevo"&&(
          <div style={{marginTop:10,padding:12,background:C.surface,borderRadius:8,border:`1px solid ${C.gold}33`}}>
            <div style={{color:C.gold,fontSize:11,marginBottom:8,fontWeight:600}}>Datos del nuevo cliente</div>
            <Row>
              <Fld lbl="Nombre completo *"><Inp value={f.clienteNuevo?.name||""} onChange={e=>setCN("name",e.target.value)} placeholder="Nombre completo"/></Fld>
              <Fld lbl="Email"><Inp type="email" value={f.clienteNuevo?.email||""} onChange={e=>setCN("email",e.target.value)} placeholder="correo@email.com"/></Fld>
            </Row>
            <Fld lbl="Teléfono / WhatsApp">
              <div style={{display:"flex",gap:6}}>
                <Sel value={f.clienteNuevo?.countryCode||"+57 🇨🇴"} onChange={e=>setCN("countryCode",e.target.value)} style={{width:130,flexShrink:0}}>
                  {COUNTRY_CODES.map(c=><option key={c} value={c}>{c}</option>)}
                </Sel>
                <Inp value={f.clienteNuevo?.phone||""} onChange={e=>setCN("phone",e.target.value)} placeholder="300 123 4567" style={{flex:1}}/>
              </div>
            </Fld>
          </div>
        )}
      </div>

      {/* SERVICIOS — múltiple selección */}
      <div style={{...sx.card,padding:14,marginBottom:12,border:`1px solid ${C.border}`}}>
        <div style={{color:C.muted,fontSize:10,textTransform:"uppercase",letterSpacing:1.2,marginBottom:10}}>Servicios (selecciona uno o más)</div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(180px,1fr))",gap:6,marginBottom:10}}>
          {svcs.filter(s=>s.active).map(svc=>{
            const sel=(f.sids||[]).includes(svc.id);
            return(
              <div key={svc.id} onClick={()=>toggleSvc(svc.id)}
                style={{...sx.card,padding:"9px 12px",cursor:"pointer",border:`1px solid ${sel?svc.color:C.border}`,background:sel?svc.color+"22":C.card,transition:"all .15s"}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                  <span style={{color:sel?svc.color:C.cream,fontWeight:sel?700:400,fontSize:12}}>{svc.img} {svc.name}</span>
                  {sel&&<span style={{color:svc.color,fontSize:14}}>✓</span>}
                </div>
                <div style={{color:C.muted,fontSize:10,marginTop:2}}>{svc.duration}min · {fmt(svc.price)}</div>
              </div>
            );
          })}
        </div>
        {(f.sids||[]).length>0&&(
          <div style={{background:C.goldD,border:`1px solid ${C.gold}44`,borderRadius:7,padding:"8px 12px",display:"flex",justifyContent:"space-between"}}>
            <span style={{color:C.gold,fontSize:13}}>{(f.sids||[]).length} servicio(s) · {totalDur} min total</span>
            <span style={{color:C.goldL,fontWeight:800,fontSize:14}}>{fmt(totalPrecio)}</span>
          </div>
        )}
      </div>

      {/* FECHA / HORA / ESTADO */}
      <Row cols={3}>
        <Fld lbl="Fecha *"><Inp type="date" value={f.date} onChange={e=>set("date",e.target.value)}/></Fld>
        <Fld lbl="Hora inicio"><Inp type="time" value={f.time} onChange={e=>set("time",e.target.value)}/></Fld>
        <Fld lbl="Hora fin (auto)"><Inp type="time" value={f.end} onChange={e=>set("end",e.target.value)}/></Fld>
      </Row>
      <Row>
        <Fld lbl="Estado">
          <Sel value={f.status} onChange={e=>set("status",e.target.value)}>
            {Object.entries(STATUS).map(([k,v])=><option key={k} value={k}>{v.l}</option>)}
          </Sel>
        </Fld>
        <Fld lbl="Anticipo / Depósito"><Inp type="number" value={f.dep} onChange={e=>set("dep",+e.target.value)} placeholder="0"/></Fld>
      </Row>
      <Fld lbl="Notas / Peticiones especiales">
        <Txta value={f.notes} onChange={e=>set("notes",e.target.value)} placeholder="Color deseado, alergias, referencias..."/>
      </Fld>

      <div style={{display:"flex",gap:8,marginTop:18,flexWrap:"wrap"}}>
        <button style={sx.btn} onClick={save}>{type==="edit"?"Guardar cambios":"Crear cita"}</button>
        <button style={sx.ghost} onClick={onClose}>Cancelar</button>
        {f.date&&f.time&&(f.sids||[]).length>0&&(
          <button style={{...sx.ghost,color:C.blue,borderColor:C.blue+"44"}} onClick={()=>{
            const url=gcalUrl();
            window.open(url,"_blank","noopener");
          }}>
            📅 Google Calendar
          </button>
        )}
        {type==="edit"&&<button style={{...sx.danger,marginLeft:"auto"}} onClick={del}>Eliminar</button>}
      </div>
    </Modal>
  );
}
// ── CLIENTES ───────────────────────────────────────────────────────
function Clientes({clients,setClients,apts,sales,svcs,staff,toast,empresa}){
  const [q,setQ]=useState("");
  const [tag,setTag]=useState("all");
  const [sortBy,setSortBy]=useState("name");
  const [modal,setModal]=useState(null);
  const [vistaCard,setVistaCard]=useState(false);
  const allTags=["all",...new Set(clients.flatMap(c=>c.tags||[]))];

  const list=clients.filter(c=>{
    const ms=c.name.toLowerCase().includes(q.toLowerCase())||
      c.phone?.includes(q)||c.email?.toLowerCase().includes(q.toLowerCase());
    const mt=tag==="all"||(c.tags||[]).includes(tag);
    return ms&&mt;
  }).sort((a,b)=>{
    if(sortBy==="name") return a.name.localeCompare(b.name);
    if(sortBy==="spent") return (b.spent||0)-(a.spent||0);
    if(sortBy==="visits") return (b.visits||0)-(a.visits||0);
    if(sortBy==="pts") return (b.pts||0)-(a.pts||0);
    if(sortBy==="recent") return (b.lastVisit||"").localeCompare(a.lastVisit||"");
    return 0;
  });

  // KPIs globales
  const totalGastado=clients.reduce((a,b)=>a+(b.spent||0),0);
  const vip=clients.filter(c=>c.pts>=300).length;
  const inactivos=clients.filter(c=>c.lastVisit&&c.lastVisit<D0(-60)).length;
  const nuevos=clients.filter(c=>c.lastVisit&&c.lastVisit>=D0(-30)).length;

  function Detail({cli}){
    const ca=apts.filter(a=>a.cid===cli.id)
      .sort((a,b)=>(b.date+b.time).localeCompare(a.date+a.time));
    const cliSales=sales.filter(s=>s.cid===cli.id);
    const realSpent=cliSales.reduce((a,b)=>a+calcVenta(b),0);
    const avgTicket=cliSales.length>0?realSpent/cliSales.length:0;
    const serviciosFav=Object.entries(
      ca.reduce((acc,a)=>{const s=svcs.find(x=>x.id===a.sid);if(s)acc[s.name]=(acc[s.name]||0)+1;return acc;},{})
    ).sort((a,b)=>b[1]-a[1]);
    const estilistaFav=Object.entries(
      ca.reduce((acc,a)=>{const s=staff.find(x=>x.id===a.tid);if(s)acc[s.name]=(acc[s.name]||0)+1;return acc;},{})
    ).sort((a,b)=>b[1]-a[1]);
    const nivelFid=cli.pts>=500?"👑 Diamond":cli.pts>=300?"💜 VIP":cli.pts>=100?"⭐ Regular":"🌱 Nuevo";
    const nivelColor=cli.pts>=500?C.goldL:cli.pts>=300?C.purple:cli.pts>=100?C.blue:C.muted;

    return(
      <div>
        {/* Header ficha */}
        <div style={{background:`linear-gradient(135deg,#0a0a0a,#1a1208)`,margin:-20,padding:"24px 20px 20px",marginBottom:20,borderBottom:`1px solid ${C.border}`}}>
          <div style={{display:"flex",gap:16,alignItems:"flex-start"}}>
            <Ava name={cli.name} color={C.gold} size={60}/>
            <div style={{flex:1}}>
              <div style={{color:C.cream,fontWeight:800,fontSize:20}}>{cli.name}</div>
              <div style={{color:C.muted,fontSize:12,marginTop:2}}>
                📱 {cli.phone} {cli.email&&`· 📧 ${cli.email}`}
              </div>
              {cli.bday&&<div style={{color:C.muted,fontSize:11,marginTop:2}}>🎂 {cli.bday} · Fuente: {cli.src}</div>}
              <div style={{display:"flex",gap:5,marginTop:8,flexWrap:"wrap"}}>
                <Badge c={nivelColor} sm>{nivelFid}</Badge>
                {(cli.tags||[]).map(t=><Badge key={t} c={C.gold} sm>{t}</Badge>)}
              </div>
            </div>
            <div style={{textAlign:"right"}}>
              <div style={{color:C.gold,fontWeight:900,fontSize:24}}>{cli.pts}</div>
              <div style={{color:C.muted,fontSize:10}}>puntos</div>
            </div>
          </div>
        </div>

        {/* KPIs cliente */}
        <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:8,marginBottom:16}}>
          {[
            {l:"Total gastado",v:fmt(realSpent||cli.spent),c:C.goldL},
            {l:"Visitas",v:ca.length||cli.visits,c:C.blue},
            {l:"Ticket promedio",v:fmt(avgTicket),c:C.green},
            {l:"Última visita",v:cli.lastVisit||"—",c:C.muted},
          ].map(k=>(
            <div key={k.l} style={{...sx.card,padding:12,textAlign:"center"}}>
              <div style={{color:k.c,fontWeight:800,fontSize:14}}>{k.v}</div>
              <div style={{color:C.muted,fontSize:9,marginTop:2,textTransform:"uppercase",letterSpacing:1}}>{k.l}</div>
            </div>
          ))}
        </div>

        {/* Favoritos */}
        {serviciosFav.length>0&&(
          <div style={{...sx.card,padding:14,marginBottom:12,background:C.surface}}>
            <div style={{color:C.muted,fontSize:10,textTransform:"uppercase",letterSpacing:1,marginBottom:8}}>Preferencias</div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
              <div>
                <div style={{color:C.muted,fontSize:10,marginBottom:4}}>Servicios favoritos</div>
                {serviciosFav.slice(0,3).map(([s,n])=>(
                  <div key={s} style={{display:"flex",justifyContent:"space-between",fontSize:11,padding:"3px 0"}}>
                    <span style={{color:C.cream}}>{s}</span>
                    <Badge c={C.gold} sm>{n}x</Badge>
                  </div>
                ))}
              </div>
              <div>
                <div style={{color:C.muted,fontSize:10,marginBottom:4}}>Estilistas preferidos</div>
                {estilistaFav.slice(0,3).map(([s,n])=>(
                  <div key={s} style={{display:"flex",justifyContent:"space-between",fontSize:11,padding:"3px 0"}}>
                    <span style={{color:C.cream}}>{s}</span>
                    <Badge c={C.purple} sm>{n}x</Badge>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Notas */}
        {cli.notes&&(
          <div style={{...sx.card,padding:12,marginBottom:14,background:C.orangeD,border:`1px solid ${C.orange}33`}}>
            <div style={{color:C.orange,fontSize:10,textTransform:"uppercase",letterSpacing:1,marginBottom:4}}>⚠ Notas / Alergias</div>
            <div style={{color:C.cream,fontSize:13}}>{cli.notes}</div>
          </div>
        )}

        {/* Historial completo */}
        <div style={{color:C.muted,fontSize:10,textTransform:"uppercase",letterSpacing:1.5,marginBottom:8}}>
          Historial de citas ({ca.length})
        </div>
        <div style={{maxHeight:280,overflowY:"auto"}}>
          {ca.map((a,i)=>{
            const svc=svcs.find(s=>s.id===a.sid);
            const st=staff.find(s=>s.id===a.tid);
            const sc=STATUS[a.status]||STATUS.pending;
            const svcNames=(a.sids||[a.sid]).map(id=>svcs.find(s=>s.id===id)?.name).filter(Boolean).join(" + ")||svc?.name||"—";
            return(
              <div key={a.id} style={{display:"flex",justifyContent:"space-between",alignItems:"center",
                padding:"9px 12px",marginBottom:4,background:i%2===0?C.surface:C.card,borderRadius:7,
                border:`1px solid ${C.border}33`}}>
                <div>
                  <div style={{color:C.cream,fontSize:12,fontWeight:600}}>{svcNames}</div>
                  <div style={{color:C.muted,fontSize:10,marginTop:2}}>
                    {a.date} · {a.time} · <span style={{color:st?.color||C.muted}}>{st?.name||"—"}</span>
                  </div>
                </div>
                <div style={{display:"flex",gap:8,alignItems:"center"}}>
                  <span style={{color:C.goldL,fontWeight:700,fontSize:12}}>{fmt(svc?.price||0)}</span>
                  <Badge c={sc.c} bg={sc.b} sm>{sc.l}</Badge>
                </div>
              </div>
            );
          })}
          {ca.length===0&&<div style={{color:C.muted,textAlign:"center",padding:20,fontSize:13}}>Sin historial de citas</div>}
        </div>

        <div style={{display:"flex",gap:8,marginTop:18}}>
          <button style={sx.btn} onClick={()=>setModal({type:"form",cli})}>✏ Editar</button>
          <button style={{...sx.btn,background:C.green}} onClick={()=>window.open(`https://wa.me/${cli.phone?.replace(/\D/g,"")}?text=${encodeURIComponent(`Hola ${cli.name}! Te escribimos desde ${empresa?.nombre||"Jimmy Expression"} 💛`)}`)}>📲 WhatsApp</button>
          <button style={sx.ghost} onClick={()=>setModal(null)}>Cerrar</button>
        </div>
      </div>
    );
  }

  function Form({cli}){
    const COUNTRY_CODES=["+57 🇨🇴","+1 🇺🇸","+34 🇪🇸","+52 🇲🇽","+54 🇦🇷","+55 🇧🇷"];
    const blank={name:"",phone:"",countryCode:"+57 🇨🇴",email:"",bday:"",notes:"",src:"Instagram",tags:[],pts:0,visits:0,spent:0,lastVisit:"",colorFormula:"",alergias:""};
    const [f,setF]=useState(cli||blank);
    const [ti,setTi]=useState("");
    const set=(k,v)=>setF(p=>({...p,[k]:v}));
    const save=()=>{
      if(!f.name){toast("El nombre es requerido","error");return;}
      if(cli){setClients(p=>p.map(c=>c.id===cli.id?{...f}:c));}
      else{setClients(p=>[...p,{...f,id:uid()}]);}
      toast(cli?"Cliente actualizado":"Cliente creado ✓");setModal(null);
    };
    const del=()=>{setClients(p=>p.filter(c=>c.id!==cli.id));toast("Cliente eliminado","warn");setModal(null);};
    const addTag=()=>{if(ti.trim()){setF(p=>({...p,tags:[...(p.tags||[]),ti.trim()]}));setTi("");}};
    return(
      <Modal title={cli?"Editar cliente":"Nuevo cliente"} onClose={()=>setModal(null)} w={600}>
        <div style={{...sx.card,padding:14,marginBottom:12}}>
          <div style={{color:C.muted,fontSize:10,textTransform:"uppercase",letterSpacing:1,marginBottom:10}}>Datos personales</div>
          <Row>
            <Fld lbl="Nombre completo *"><Inp value={f.name} onChange={e=>set("name",e.target.value)} placeholder="Nombre completo"/></Fld>
            <Fld lbl="Email"><Inp value={f.email} onChange={e=>set("email",e.target.value)} type="email" placeholder="correo@email.com"/></Fld>
          </Row>
          <Fld lbl="Teléfono / WhatsApp">
            <div style={{display:"flex",gap:6}}>
              <Sel value={f.countryCode||"+57 🇨🇴"} onChange={e=>set("countryCode",e.target.value)} style={{width:130,flexShrink:0}}>
                {COUNTRY_CODES.map(c=><option key={c} value={c}>{c}</option>)}
              </Sel>
              <Inp value={f.phone} onChange={e=>set("phone",e.target.value)} placeholder="300 123 4567" style={{flex:1}}/>
            </div>
          </Fld>
          <Row>
            <Fld lbl="Fecha de nacimiento"><Inp type="date" value={f.bday} onChange={e=>set("bday",e.target.value)}/></Fld>
            <Fld lbl="Cómo nos conoció">
              <Sel value={f.src} onChange={e=>set("src",e.target.value)}>
                {["Instagram","TikTok","Google","Referido","Hotel","Facebook","WhatsApp","Otro"].map(s=><option key={s}>{s}</option>)}
              </Sel>
            </Fld>
          </Row>
        </div>
        <div style={{...sx.card,padding:14,marginBottom:12}}>
          <div style={{color:C.muted,fontSize:10,textTransform:"uppercase",letterSpacing:1,marginBottom:10}}>Información técnica</div>
          <Fld lbl="⚠ Alergias / Contraindicaciones">
            <Txta value={f.alergias||""} onChange={e=>set("alergias",e.target.value)} placeholder="Alergias a tintes, sensibilidades..."/>
          </Fld>
          <Fld lbl="🎨 Fórmula de color">
            <Txta value={f.colorFormula||""} onChange={e=>set("colorFormula",e.target.value)} placeholder="Color base, proporciones, tiempo..." style={{minHeight:50}}/>
          </Fld>
          <Fld lbl="📝 Notas generales">
            <Txta value={f.notes} onChange={e=>set("notes",e.target.value)} placeholder="Preferencias, peticiones especiales..."/>
          </Fld>
        </div>
        <div style={{...sx.card,padding:14,marginBottom:12}}>
          <div style={{color:C.muted,fontSize:10,textTransform:"uppercase",letterSpacing:1,marginBottom:10}}>Fidelización</div>
          <Row>
            <Fld lbl="Puntos acumulados"><Inp type="number" value={f.pts} onChange={e=>set("pts",+e.target.value)}/></Fld>
            <Fld lbl="Visitas totales"><Inp type="number" value={f.visits} onChange={e=>set("visits",+e.target.value)}/></Fld>
          </Row>
          <Fld lbl="Etiquetas">
            <div style={{display:"flex",gap:5,flexWrap:"wrap",marginBottom:7}}>
              {(f.tags||[]).map(t=>(
                <span key={t} style={{background:C.goldD,color:C.gold,borderRadius:4,padding:"3px 8px",fontSize:12,cursor:"pointer"}}
                  onClick={()=>setF(p=>({...p,tags:p.tags.filter(x=>x!==t)}))}>
                  {t} ×
                </span>
              ))}
            </div>
            <div style={{display:"flex",gap:6}}>
              <Inp value={ti} onChange={e=>setTi(e.target.value)} onKeyDown={e=>e.key==="Enter"&&addTag()}
                placeholder="VIP, Extensiones, Turista + Enter" style={{flex:1}}/>
              <button style={{...sx.ghost,padding:"9px 12px"}} onClick={addTag}>+</button>
            </div>
            <div style={{display:"flex",gap:5,flexWrap:"wrap",marginTop:6}}>
              {["VIP","Recurrente","Nueva","Turista","Extensions","Color","Referida"].map(t=>(
                !(f.tags||[]).includes(t)&&<button key={t} onClick={()=>setF(p=>({...p,tags:[...(p.tags||[]),t]}))}
                  style={{...sx.ghost,padding:"3px 8px",fontSize:10,color:C.muted}}>{t}</button>
              ))}
            </div>
          </Fld>
        </div>
        <div style={{display:"flex",gap:8,marginTop:4}}>
          <button style={sx.btn} onClick={save}>{cli?"Guardar cambios":"Crear cliente"}</button>
          <button style={sx.ghost} onClick={()=>setModal(null)}>Cancelar</button>
          {cli&&<button style={{...sx.danger,marginLeft:"auto"}} onClick={del}>Eliminar</button>}
        </div>
      </Modal>
    );
  }

  return(
    <div>
      {/* KPIs */}
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(120px,1fr))",gap:10,marginBottom:18}}>
        <KPI label="Total clientes" value={clients.length} sub={`${nuevos} nuevos (30d)`} accent={C.blue} icon="👥"/>
        <KPI label="Clientes VIP" value={vip} sub="300+ puntos" accent={C.purple} icon="👑"/>
        <KPI label="Inactivos" value={inactivos} sub="+60 días sin visita" accent={inactivos>0?C.orange:C.muted} icon="😴"/>
        <KPI label="Facturación total" value={fmtM(totalGastado)} sub="histórico" accent={C.gold} icon="💰"/>
      </div>

      {/* Filtros */}
      <div style={{display:"flex",gap:8,marginBottom:14,flexWrap:"wrap",justifyContent:"space-between",alignItems:"center"}}>
        <Inp value={q} onChange={e=>setQ(e.target.value)} placeholder="🔍 Buscar por nombre, teléfono o email..." style={{flex:1,minWidth:220}}/>
        <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
          <Sel value={tag} onChange={e=>setTag(e.target.value)} style={{width:160}}>
            {allTags.map(t=><option key={t} value={t}>{t==="all"?"Todas las etiquetas":t}</option>)}
          </Sel>
          <Sel value={sortBy} onChange={e=>setSortBy(e.target.value)} style={{width:140}}>
            <option value="name">Ordenar: A-Z</option>
            <option value="spent">Mayor gasto</option>
            <option value="visits">Más visitas</option>
            <option value="pts">Más puntos</option>
            <option value="recent">Más reciente</option>
          </Sel>
          <button onClick={()=>setVistaCard(!vistaCard)} style={{...sx.ghost,padding:"9px 12px",fontSize:13}}>
            {vistaCard?"☰":"⊞"}
          </button>
          <button style={sx.btn} onClick={()=>setModal({type:"form",cli:null})}>+ Nuevo cliente</button>
        </div>
      </div>

      {/* Vista tarjetas */}
      {vistaCard?(
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(240px,1fr))",gap:10}}>
          {list.map(c=>{
            const nivelColor=c.pts>=500?C.goldL:c.pts>=300?C.purple:c.pts>=100?C.blue:C.muted;
            return(
              <div key={c.id} onClick={()=>setModal({type:"detail",cli:c})}
                style={{...sx.card,padding:16,cursor:"pointer",border:`1px solid ${C.border}`,transition:"all .15s"}}
                onMouseEnter={e=>e.currentTarget.style.borderColor=C.gold}
                onMouseLeave={e=>e.currentTarget.style.borderColor=C.border}>
                <div style={{display:"flex",gap:10,alignItems:"center",marginBottom:10}}>
                  <Ava name={c.name} color={nivelColor} size={38}/>
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{color:C.cream,fontWeight:700,fontSize:13,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{c.name}</div>
                    <div style={{color:C.muted,fontSize:11}}>{c.phone}</div>
                  </div>
                  <div style={{color:nivelColor,fontWeight:800,fontSize:14}}>{c.pts}p</div>
                </div>
                <div style={{display:"flex",justifyContent:"space-between",fontSize:11}}>
                  <span style={{color:C.muted}}>{c.visits} visitas</span>
                  <span style={{color:C.goldL,fontWeight:700}}>{fmt(c.spent)}</span>
                </div>
                <div style={{display:"flex",gap:4,marginTop:8,flexWrap:"wrap"}}>
                  {(c.tags||[]).slice(0,3).map(t=><Badge key={t} c={C.gold} sm>{t}</Badge>)}
                </div>
              </div>
            );
          })}
        </div>
      ):(
        /* Vista tabla */
        <div>
          <div style={{...sx.card,display:"grid",gridTemplateColumns:"2fr 1.2fr 1.2fr 0.7fr 1fr 0.7fr 0.9fr",padding:"8px 0",marginBottom:6}}>
            {["Cliente","Teléfono","Email","Visitas","Total gastado","Puntos","Última visita"].map(h=>(
              <div key={h} style={{color:C.muted,fontSize:9,letterSpacing:1.2,textTransform:"uppercase",padding:"0 12px"}}>{h}</div>
            ))}
          </div>
          {list.map(c=>{
            const nivelColor=c.pts>=500?C.goldL:c.pts>=300?C.purple:c.pts>=100?C.blue:C.muted;
            return(
              <div key={c.id} onClick={()=>setModal({type:"detail",cli:c})}
                style={{...sx.card,display:"grid",gridTemplateColumns:"2fr 1.2fr 1.2fr 0.7fr 1fr 0.7fr 0.9fr",
                  alignItems:"center",marginBottom:4,padding:"10px 0",cursor:"pointer",transition:"background .15s"}}
                onMouseEnter={e=>e.currentTarget.style.background=C.hover}
                onMouseLeave={e=>e.currentTarget.style.background=C.card}>
                <div style={{padding:"0 12px",display:"flex",alignItems:"center",gap:8}}>
                  <Ava name={c.name} color={nivelColor} size={28}/>
                  <div>
                    <div style={{color:C.cream,fontWeight:600,fontSize:12}}>{c.name}</div>
                    <div style={{color:C.muted,fontSize:10}}>{c.src}</div>
                  </div>
                </div>
                <div style={{padding:"0 12px",color:C.muted,fontSize:11}}>{c.phone}</div>
                <div style={{padding:"0 12px",color:C.muted,fontSize:11,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{c.email||"—"}</div>
                <div style={{padding:"0 12px",color:C.cream,fontSize:13,textAlign:"center",fontWeight:600}}>{c.visits}</div>
                <div style={{padding:"0 12px",color:C.goldL,fontWeight:700,fontSize:12}}>{fmt(c.spent)}</div>
                <div style={{padding:"0 12px",color:nivelColor,fontWeight:700,fontSize:12}}>{c.pts}</div>
                <div style={{padding:"0 12px",color:C.muted,fontSize:11}}>{c.lastVisit||"—"}</div>
              </div>
            );
          })}
        </div>
      )}

      <div style={{color:C.muted,fontSize:11,marginTop:10}}>
        {list.length} de {clients.length} clientes
        {q&&` · Buscando: "${q}"`}
      </div>
      {modal?.type==="detail"&&<Modal title="Ficha del cliente" onClose={()=>setModal(null)} w={680}><Detail cli={modal.cli}/></Modal>}
      {modal?.type==="form"&&<Form cli={modal.cli}/>}
    </div>
  );
}


// ── CAJA CON TIQUETES Y FACTURAS ─────────────────────────────────
function CajaSection({sales,setSales,apts,clients,svcs,staff,products,toast,empresa,nextFactura}){
  const [date,setDate]=useState(D0(0));
  const [tab2,setTab2]=useState("dia");
  const [modal,setModal]=useState(false);
  const [modalEnvio,setModalEnvio]=useState(null);
  const [hDesde,setHDesde]=useState(D0(-30));
  const [hHasta,setHHasta]=useState(D0(0));

  // FUENTE ÚNICA: solo ventas registradas manualmente en caja
  // Las citas son para la agenda; el cobro se registra explícitamente aquí
  const all=sales.filter(s=>s.date===date);
  // Usa calcVenta y calcBase globales
  const totSvc=all.filter(s=>s.type==="service").reduce((a,b)=>a+calcBase(b),0);
  const totRet=all.filter(s=>s.type==="retail"||s.type==="other").reduce((a,b)=>a+calcBase(b),0);
  const totTip=all.reduce((a,b)=>a+(+b.tip||0),0);
  const total=totSvc+totRet+totTip;
  // Desglose por método de pago (soporta mixto)
  const byPay=all.reduce((acc,s)=>{
    const v=calcVenta(s);
    if(s.pagos&&s.pagos.length>0){
      s.pagos.forEach(pg=>{acc[pg.metodo||"efectivo"]=(acc[pg.metodo||"efectivo"]||0)+(+pg.monto||0);});
    } else {
      acc[s.pay]=(acc[s.pay]||0)+v;
    }
    return acc;
  },{});

  function SaleModal(){
    // Estado multi-item: soporta varios servicios, productos y estilistas
    const [items,setItems]=useState([{id:uid(),tipo:"service",sid:"",pid:"",tid:staff[0]?.id||"",monto:0,nota:""}]);
    const [f,setF]=useState({cid:clients[0]?.id||"",discType:"pct",disc:0,tip:0,date,pagos:[{metodo:"efectivo",monto:0}]});
    const set=(k,v)=>setF(p=>({...p,[k]:v}));

    const addItem=()=>setItems(p=>[...p,{id:uid(),tipo:"service",sid:"",pid:"",tid:staff[0]?.id||"",monto:0,nota:""}]);
    const remItem=(id)=>setItems(p=>p.filter(x=>x.id!==id));
    const setItem=(id,k,v)=>setItems(p=>p.map(x=>{
      if(x.id!==id) return x;
      const upd={...x,[k]:v};
      // Auto-precio al seleccionar servicio
      if(k==="sid"&&v){const s=svcs.find(x=>x.id===v);if(s)upd.monto=s.price;}
      if(k==="pid"&&v){const p=products?.find(x=>x.id===v);if(p)upd.monto=p.price;}
      return upd;
    }));

    const subtotalItems=items.reduce((a,x)=>a+(+x.monto||0),0);

    // Cálculo sobre subtotal de todos los ítems
    const descMonto=f.discType==="pct"?(subtotalItems*(+f.disc/100)):(+f.disc||0);
    const base=Math.max(0,subtotalItems-descMonto);
    const net=base+(+f.tip||0);

    // Pagos mixtos
    const totalPagado=(f.pagos||[]).reduce((a,b)=>a+(+b.monto||0),0);
    const diferencia=net-totalPagado;
    const addPago=()=>setF(p=>({...p,pagos:[...p.pagos,{metodo:"nequi",monto:Math.max(0,diferencia)}]}));
    const remPago=(i)=>setF(p=>({...p,pagos:p.pagos.filter((_,idx)=>idx!==i)}));
    const setPago=(i,k,v)=>setF(p=>({...p,pagos:p.pagos.map((pg,idx)=>idx===i?{...pg,[k]:v}:pg)}));

    const save=()=>{
      if(items.length===0){toast("Agrega al menos un ítem","error");return;}
      if(Math.abs(diferencia)>1){toast(`Faltan ${fmt(Math.abs(diferencia))} por asignar a los métodos de pago`,"error");return;}
      const payStr=(f.pagos||[]).length===1?f.pagos[0].metodo:"mixto";
      // Guardar una venta por ítem (para nómina y estadísticas correctas)
      const nuevasVentas=items.map(it=>{
        const svc=it.tipo==="service"?svcs.find(s=>s.id===it.sid):null;
        const prd=it.tipo==="product"?products?.find(p=>p.id===it.pid):null;
        return{
          id:uid(),
          cid:f.cid,
          sid:it.sid||null,
          pid:it.pid||null,
          tid:it.tid||null,
          type:it.tipo==="product"?"retail":"service",
          amount:+it.monto,
          disc:it===items[0]?+f.disc:0,
          discType:it===items[0]?f.discType:"pct",
          discMonto:it===items[0]?descMonto:0,
          tip:it===items[items.length-1]?+f.tip:0,
          pay:payStr,
          pagos:it===items[0]?f.pagos:[],
          base:+it.monto,
          total:+it.monto,
          date:f.date,
          notes:it.nota||(svc?.name||prd?.name||""),
        };
      });
      // También guardar resumen consolidado
      const ventaResumen={
        id:uid()+"_res",
        cid:f.cid,
        type:"resumen",
        items,
        amount:subtotalItems,
        disc:+f.disc,
        discMonto:descMonto,
        discType:f.discType,
        tip:+f.tip,
        pay:payStr,
        pagos:f.pagos,
        base,
        total:net,
        date:f.date,
      };
      setSales(p=>[...p,...nuevasVentas,ventaResumen]);
      toast(`Venta registrada — ${fmt(net)} ✓`);setModal(false);
    };

    return(
      <Modal title="Registrar venta" onClose={()=>setModal(false)} w={580}>
        {/* Fecha y cliente */}
        <Row>
          <Fld lbl="Fecha"><Inp type="date" value={f.date} onChange={e=>set("date",e.target.value)}/></Fld>
          <Fld lbl="Cliente"><Sel value={f.cid} onChange={e=>set("cid",e.target.value)}>
            {clients.map(c=><option key={c.id} value={c.id}>{c.name}</option>)}
          </Sel></Fld>
        </Row>
        {/* Ítems: servicios, productos, estilistas */}
        <div style={{...sx.card,padding:14,marginBottom:12,border:`1px solid ${C.border}`}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
            <div style={{color:C.muted,fontSize:10,textTransform:"uppercase",letterSpacing:1}}>Ítems de la venta</div>
            <button type="button" onClick={addItem} style={{...sx.ghost,padding:"4px 10px",fontSize:11}}>+ Agregar ítem</button>
          </div>
          {items.map((it,idx)=>(
            <div key={it.id} style={{...sx.card,padding:12,marginBottom:8,background:C.surface,border:`1px solid ${C.border}44`}}>
              <div style={{display:"flex",gap:6,marginBottom:8,alignItems:"center"}}>
                <Sel value={it.tipo} onChange={e=>setItem(it.id,"tipo",e.target.value)} style={{width:120,flexShrink:0}}>
                  <option value="service">✂️ Servicio</option>
                  <option value="product">🛍 Producto</option>
                  <option value="other">📝 Otro</option>
                </Sel>
                {it.tipo==="service"&&<Sel value={it.sid} onChange={e=>setItem(it.id,"sid",e.target.value)} style={{flex:1}}>
                  <option value="">— Seleccionar servicio —</option>
                  {svcs.filter(s=>s.active).map(s=><option key={s.id} value={s.id}>{s.name} — Desde: {fmt(s.price)}</option>)}
                </Sel>}
                {it.tipo==="product"&&<Sel value={it.pid} onChange={e=>setItem(it.id,"pid",e.target.value)} style={{flex:1}}>
                  <option value="">— Seleccionar producto —</option>
                  {(products||[]).filter(p=>p.active).map(p=><option key={p.id} value={p.id}>{p.name} — {fmt(p.price)}</option>)}
                </Sel>}
                {it.tipo==="other"&&<Inp value={it.nota||""} onChange={e=>setItem(it.id,"nota",e.target.value)} placeholder="Descripción..." style={{flex:1}}/>}
                {items.length>1&&<button onClick={()=>remItem(it.id)} style={{background:"transparent",border:"none",color:C.red,fontSize:18,cursor:"pointer",flexShrink:0,padding:"0 4px"}}>×</button>}
              </div>
              <div style={{display:"flex",gap:6,alignItems:"center"}}>
                <Fld lbl="Estilista / Responsable" style={{flex:1}}>
                  <Sel value={it.tid} onChange={e=>setItem(it.id,"tid",e.target.value)}>
                    <option value="">— Ninguno —</option>
                    {staff.filter(s=>s.active).map(s=><option key={s.id} value={s.id}>{s.name}</option>)}
                  </Sel>
                </Fld>
                <Fld lbl="Valor (COP)">
                  <Inp type="number" value={it.monto} onChange={e=>setItem(it.id,"monto",+e.target.value)} style={{width:120}}/>
                </Fld>
              </div>
            </div>
          ))}
          <div style={{display:"flex",justifyContent:"space-between",padding:"8px 0",borderTop:`1px solid ${C.border}`,marginTop:4}}>
            <span style={{color:C.muted,fontSize:12}}>Subtotal {items.length} ítem(s):</span>
            <span style={{color:C.gold,fontWeight:700,fontSize:14}}>{fmt(subtotalItems)}</span>
          </div>
        </div>

        {/* Valor + descuento */}
        <div style={{...sx.card,padding:14,marginBottom:12,border:`1px solid ${C.border}`}}>
          <div style={{color:C.muted,fontSize:10,textTransform:"uppercase",letterSpacing:1,marginBottom:10}}>Valor y descuento</div>
          <Row cols={3}>
            <Fld lbl="Valor bruto"><Inp type="number" value={f.amount} onChange={e=>set("amount",e.target.value)}/></Fld>
            <Fld lbl="Tipo descuento">
              <Sel value={f.discType} onChange={e=>set("discType",e.target.value)}>
                <option value="pct">Porcentaje (%)</option>
                <option value="monto">Valor fijo ($)</option>
              </Sel>
            </Fld>
            <Fld lbl={f.discType==="pct"?"Descuento %":"Descuento $"}>
              <Inp type="number" value={f.disc} onChange={e=>set("disc",e.target.value)} min={0} max={f.discType==="pct"?100:f.amount}/>
            </Fld>
          </Row>
          <Row>
            <Fld lbl="Propina al estilista"><Inp type="number" value={f.tip} onChange={e=>set("tip",e.target.value)} min={0}/></Fld>
            <div style={{display:"flex",flexDirection:"column",gap:4,justifyContent:"flex-end",paddingBottom:1}}>
              {descMonto>0&&<div style={{fontSize:12,color:C.orange}}>Descuento: -{fmt(descMonto)}</div>}
              <div style={{fontSize:12,color:C.muted}}>Base: {fmt(base)}</div>
            </div>
          </Row>
        </div>

        {/* Métodos de pago mixto */}
        <div style={{...sx.card,padding:14,marginBottom:12,border:`1px solid ${C.border}`}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
            <div style={{color:C.muted,fontSize:10,textTransform:"uppercase",letterSpacing:1}}>Método(s) de pago</div>
            <button style={{...sx.ghost,padding:"4px 10px",fontSize:11}} onClick={addPago}>+ Agregar método</button>
          </div>
          {(f.pagos||[]).map((pg,i)=>(
            <div key={i} style={{display:"flex",gap:8,marginBottom:8,alignItems:"center"}}>
              <Sel value={pg.metodo} onChange={e=>setPago(i,"metodo",e.target.value)} style={{flex:1}}>
                {PAY_METHODS.filter(m=>m!=="mixto").map(m=><option key={m} value={m}>{m.charAt(0).toUpperCase()+m.slice(1)}</option>)}
              </Sel>
              <Inp type="number" value={pg.monto} onChange={e=>setPago(i,"monto",e.target.value)} style={{width:120}} placeholder="Monto"/>
              {(f.pagos||[]).length>1&&<button onClick={()=>remPago(i)} style={{background:"transparent",border:"none",color:C.red,fontSize:18,cursor:"pointer",padding:"0 4px"}}>×</button>}
            </div>
          ))}
          <div style={{display:"flex",justifyContent:"space-between",padding:"8px 0",borderTop:`1px solid ${C.border}`,marginTop:4}}>
            <span style={{color:C.muted,fontSize:12}}>Total asignado:</span>
            <span style={{color:Math.abs(diferencia)<1?C.green:C.red,fontWeight:700,fontSize:13}}>{fmt(totalPagado)}</span>
          </div>
          {Math.abs(diferencia)>=1&&<div style={{color:C.orange,fontSize:11,textAlign:"right"}}>
            {diferencia>0?`Faltan: ${fmt(diferencia)}`:`Exceso: ${fmt(-diferencia)}`}
          </div>}
        </div>

        {/* Total final */}
        <div style={{...sx.card,padding:14,background:C.greenD,border:`1px solid ${C.green}44`}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <div>
              <div style={{color:C.muted,fontSize:11}}>TOTAL A COBRAR</div>
              {f.tip>0&&<div style={{color:C.muted,fontSize:10}}>incl. propina {fmt(+f.tip)}</div>}
            </div>
            <div style={{color:C.green,fontWeight:800,fontSize:22}}>{fmt(net)}</div>
          </div>
        </div>
        <div style={{display:"flex",gap:8,marginTop:16}}>
          <button style={sx.btn} onClick={save}>Registrar venta</button>
          <button style={sx.ghost} onClick={()=>setModal(false)}>Cancelar</button>
        </div>
      </Modal>
    );
  }

  return(
    <div>
      {/* KPIs premium caja */}
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(130px,1fr))",gap:10,marginBottom:16}}>
        <KPI label="Total del día" value={fmtM(total)} sub={`${all.length} transacciones`} accent={C.green} icon="💵"/>
        <KPI label="Servicios" value={fmtM(totSvc)} sub="sin propinas" accent={C.gold} icon="✂️"/>
        <KPI label="Retail / Otro" value={fmtM(totRet)} sub="productos" accent={C.purple} icon="🛍️"/>
        <KPI label="Propinas" value={fmtM(totTip)} sub="a estilistas" accent={C.rose} icon="💜"/>
        {Object.entries(byPay).filter(([,v])=>v>0).map(([m,v])=>(
          <KPI key={m} label={m.charAt(0).toUpperCase()+m.slice(1)} value={fmtM(v)} sub="recibido" accent={C.blue} icon={m==="efectivo"?"💵":m==="tarjeta"?"💳":"📲"}/>
        ))}
      </div>
      <div style={{display:"flex",gap:8,marginBottom:16,alignItems:"center",flexWrap:"wrap",justifyContent:"space-between"}}>
        <div style={{display:"flex",gap:6}}>
          <Inp type="date" value={date} onChange={e=>setDate(e.target.value)} style={{width:152}}/>
          {["dia","historial"].map(t=><button key={t} onClick={()=>setTab2(t)} style={{...(tab2===t?sx.btn:sx.ghost),padding:"7px 14px",fontSize:12}}>{t==="dia"?"Caja del día":"Historial"}</button>)}
        </div>
        <button style={sx.btn} onClick={()=>setModal(true)}>+ Registrar venta</button>
      </div>
      {tab2==="dia"&&(<>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(110px,1fr))",gap:10,marginBottom:16}}>
          {[{l:"Servicios",v:fmt(totSvc),c:C.gold},{l:"Retail",v:fmt(totRet),c:C.purple},{l:"Propinas",v:fmt(totTip),c:C.rose},{l:"TOTAL",v:fmt(total),c:C.green}].map(k=>(
            <div key={k.l} style={{...sx.card,padding:12,textAlign:"center"}}><div style={{color:k.c,fontWeight:800,fontSize:17}}>{k.v}</div><div style={{color:C.muted,fontSize:10,marginTop:2,textTransform:"uppercase",letterSpacing:1}}>{k.l}</div></div>
          ))}
        </div>
        {Object.keys(byPay).length>0&&<div style={{...sx.card,padding:14,marginBottom:14}}>
          <div style={{color:C.muted,fontSize:10,textTransform:"uppercase",letterSpacing:1.5,marginBottom:10}}>Por método de pago</div>
          <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>{Object.entries(byPay).map(([p,v])=>(
            <div key={p} style={{flex:1,minWidth:90,textAlign:"center",padding:10,border:`1px solid ${C.border}`,borderRadius:8}}><div style={{color:C.cream,fontWeight:700,fontSize:15}}>{fmt(v)}</div><div style={{color:C.muted,fontSize:11,marginTop:2}}>{p.charAt(0).toUpperCase()+p.slice(1)}</div></div>
          ))}</div>
        </div>}
        <div style={{...sx.card,overflow:"hidden"}}>
          <table style={{width:"100%",borderCollapse:"collapse"}}>
            <thead><tr style={{borderBottom:`1px solid ${C.border}`}}>{["Cliente","Servicio","Estilista","Pago","Desc.","Propina","Total","Acciones"].map(h=><th key={h} style={{color:C.muted,fontSize:10,letterSpacing:1,textTransform:"uppercase",padding:"10px 12px",textAlign:"left"}}>{h}</th>)}</tr></thead>
            <tbody>
              {all.length===0&&<tr><td colSpan={8} style={{color:C.muted,textAlign:"center",padding:28}}>Sin ventas para esta fecha</td></tr>}
              {all.map((s,i)=>{
                const svc=svcs.find(x=>x.id===s.sid),cli=clients.find(x=>x.id===s.cid),st=staff.find(x=>x.id===s.tid);
                const val=calcVenta(s);
                return(
                  <tr key={s.id} style={{borderBottom:i<all.length-1?`1px solid ${C.border}11`:"none",background:i%2===0?"transparent":C.surface+"44"}}>
                    <td style={{color:C.cream,padding:"10px 12px",fontSize:12}}>{cli?.name||"—"}</td>
                    <td style={{color:C.muted,padding:"10px 12px",fontSize:11,maxWidth:120,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{svc?.name||s.notes||"—"}</td>
                    <td style={{color:st?.color||C.muted,padding:"10px 12px",fontSize:11}}>{st?.name||"—"}</td>
                    <td style={{padding:"10px 12px"}}>
                      {s.pagos&&s.pagos.length>1
                        ?<div style={{display:"flex",gap:3,flexWrap:"wrap"}}>{s.pagos.map((pg,pi)=><Badge key={pi} c={C.blue} sm>{pg.metodo} {fmt(pg.monto)}</Badge>)}</div>
                        :<Badge c={C.blue} sm>{s.pay}</Badge>}
                    </td>
                    <td style={{color:s.disc>0?C.orange:C.muted,padding:"10px 12px",fontSize:11}}>{s.disc>0?`${s.disc}%`:"—"}</td>
                    <td style={{color:C.rose,padding:"10px 12px",fontSize:11}}>{s.tip>0?fmt(s.tip):"—"}</td>
                    <td style={{color:C.goldL,fontWeight:700,padding:"10px 12px",fontSize:13}}>{fmt(val+(s.tip||0))}</td>
                    <td style={{padding:"10px 12px"}}>
                      <div style={{display:"flex",gap:4}}>
                        <button title="Tiquete / Enviar" onClick={()=>setModalEnvio({venta:s,cli,svc,st,tipo:"ticket"})} style={{background:C.surface,border:`1px solid ${C.border}`,borderRadius:5,color:C.muted,padding:"3px 7px",fontSize:11,cursor:"pointer"}}>🧾</button>
                        <button title="Factura / Enviar" onClick={()=>setModalEnvio({venta:s,cli,svc,st,tipo:"factura",num:nextFactura()})} style={{background:C.surface,border:`1px solid ${C.border}`,borderRadius:5,color:C.muted,padding:"3px 7px",fontSize:11,cursor:"pointer"}}>📄</button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
            {all.length>0&&<tfoot><tr style={{borderTop:`1px solid ${C.gold}44`}}><td colSpan={7} style={{color:C.gold,fontWeight:700,padding:"11px 12px",fontSize:12,textTransform:"uppercase",letterSpacing:1}}>Total del día</td><td style={{color:C.gold,fontWeight:800,padding:"11px 12px",fontSize:16}}>{fmt(total)}</td></tr></tfoot>}
          </table>
        </div>
      </>)}
      {tab2==="historial"&&(()=>{
        const salesRango=sales.filter(s=>s.date>=hDesde&&s.date<=hHasta);
        const totalRango=salesRango.reduce((a,b)=>a+calcVenta(b),0);
        const porMetodo=salesRango.reduce((acc,s)=>{
          const m=s.pay||"efectivo"; acc[m]=(acc[m]||0)+calcVenta(s); return acc;
        },{});
        const rankSvcs=Object.entries(
          salesRango.filter(s=>s.type==="service").reduce((acc,s)=>{
            const svc=svcs.find(x=>x.id===s.sid);
            const n=svc?.name||s.notes||"Servicio";
            if(!acc[n]) acc[n]={cnt:0,rev:0};
            acc[n].cnt++;acc[n].rev+=calcVenta(s);
            return acc;
          },{})
        ).map(([name,d])=>({name,...d})).sort((a,b)=>b.rev-a.rev);
        const rankStf=staff.filter(s=>s.active).map(st=>({
          ...st,
          rev:salesRango.filter(s=>s.tid===st.id).reduce((a,b)=>a+calcVenta(b),0),
          cnt:salesRango.filter(s=>s.tid===st.id).length
        })).sort((a,b)=>b.rev-a.rev);
        return(
          <div>
            <div style={{...sx.card,padding:14,marginBottom:14}}>
              <div style={{display:"flex",gap:8,alignItems:"flex-end",flexWrap:"wrap"}}>
                <Fld lbl="Desde"><Inp type="date" value={hDesde} onChange={e=>setHDesde(e.target.value)} style={{width:145}}/></Fld>
                <Fld lbl="Hasta"><Inp type="date" value={hHasta} onChange={e=>setHHasta(e.target.value)} style={{width:145}}/></Fld>
                <div style={{display:"flex",gap:5,paddingBottom:1}}>
                  {[{l:"Hoy",d:0},{l:"7d",d:-7},{l:"15d",d:-15},{l:"30d",d:-30},{l:"90d",d:-90}].map(r=>(
                    <button key={r.l} onClick={()=>{setHDesde(D0(r.d));setHHasta(D0(0));}} style={{...sx.ghost,padding:"7px 10px",fontSize:11}}>{r.l}</button>
                  ))}
                </div>
              </div>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(120px,1fr))",gap:8,marginBottom:14}}>
              <KPI label="Total período" value={fmt(totalRango)} sub={`${salesRango.length} ventas`} accent={C.green} icon="💵"/>
              {Object.entries(porMetodo).map(([m,v])=>(
                <KPI key={m} label={m.charAt(0).toUpperCase()+m.slice(1)} value={fmt(v)} sub="" accent={C.blue} icon={m==="efectivo"?"💵":m==="tarjeta"?"💳":"📲"}/>
              ))}
            </div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:14}}>
              <div style={{...sx.card,padding:16}}>
                <div style={{color:C.gold,fontWeight:700,fontSize:13,marginBottom:12}}>🏆 Ranking servicios</div>
                {rankSvcs.length===0&&<div style={{color:C.muted,fontSize:12,textAlign:"center",padding:16}}>Sin datos</div>}
                {rankSvcs.map((s,i)=>(
                  <div key={s.name} style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}>
                    <div style={{width:22,height:22,borderRadius:"50%",background:i===0?C.gold:C.surface,border:`1px solid ${C.border}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:700,color:i===0?C.bg:C.muted,flexShrink:0}}>{i+1}</div>
                    <div style={{flex:1}}>
                      <div style={{color:C.cream,fontSize:12}}>{s.name}</div>
                      <div style={{height:3,background:C.border,borderRadius:2,marginTop:3}}>
                        <div style={{width:`${rankSvcs[0]?.rev>0?(s.rev/rankSvcs[0].rev)*100:0}%`,height:"100%",background:C.gold,borderRadius:2}}/>
                      </div>
                    </div>
                    <div style={{textAlign:"right",flexShrink:0}}>
                      <div style={{color:C.goldL,fontWeight:700,fontSize:12}}>{fmt(s.rev)}</div>
                      <div style={{color:C.muted,fontSize:10}}>{s.cnt}x</div>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{...sx.card,padding:16}}>
                <div style={{color:C.purple,fontWeight:700,fontSize:13,marginBottom:12}}>🎯 Ranking estilistas</div>
                {rankStf.filter(s=>s.rev>0).map((s,i)=>(
                  <div key={s.id} style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}>
                    <Ava name={s.name} color={s.color} size={26}/>
                    <div style={{flex:1}}>
                      <div style={{display:"flex",justifyContent:"space-between"}}>
                        <span style={{color:C.cream,fontSize:12}}>{s.name}</span>
                        <span style={{color:C.goldL,fontWeight:700,fontSize:12}}>{fmt(s.rev)}</span>
                      </div>
                      <div style={{height:3,background:C.border,borderRadius:2,marginTop:3}}>
                        <div style={{width:`${rankStf[0]?.rev>0?(s.rev/rankStf[0].rev)*100:0}%`,height:"100%",background:s.color,borderRadius:2}}/>
                      </div>
                    </div>
                  </div>
                ))}
                {rankStf.filter(s=>s.rev>0).length===0&&<div style={{color:C.muted,fontSize:12,textAlign:"center",padding:16}}>Sin datos</div>}
              </div>
            </div>
            <div style={{...sx.card,overflow:"hidden"}}>
              <div style={{padding:"10px 16px",borderBottom:`1px solid ${C.border}`,display:"flex",justifyContent:"space-between"}}>
                <span style={{color:C.muted,fontSize:10,textTransform:"uppercase",letterSpacing:1}}>Detalle de ventas</span>
                <span style={{color:C.muted,fontSize:11}}>{salesRango.length} transacciones</span>
              </div>
              <div style={{maxHeight:320,overflowY:"auto"}}>
                {salesRango.sort((a,b)=>b.date.localeCompare(a.date)).map((s,i)=>{
                  const cli=clients.find(c=>c.id===s.cid);
                  const svc=svcs.find(x=>x.id===s.sid);
                  const st=staff.find(x=>x.id===s.tid);
                  return(
                    <div key={s.id} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"8px 16px",borderBottom:i<salesRango.length-1?`1px solid ${C.border}22`:"none",background:i%2===0?"transparent":C.surface}}>
                      <div>
                        <div style={{color:C.cream,fontSize:12}}>{cli?.name||"—"} · {svc?.name||s.notes||"—"}</div>
                        <div style={{color:C.muted,fontSize:10}}>{s.date} · {st?.name||"—"} · {s.pay||"—"}</div>
                      </div>
                      <div style={{color:C.goldL,fontWeight:700,fontSize:13}}>{fmt(calcVenta(s))}</div>
                    </div>
                  );
                })}
                {salesRango.length===0&&<div style={{color:C.muted,textAlign:"center",padding:30,fontSize:13}}>Sin ventas en este período</div>}
              </div>
            </div>
          </div>
        );
      })()}
      {modal&&<SaleModal/>}
      {modalEnvio&&<ModalEnvio
        venta={modalEnvio.venta}
        cliente={modalEnvio.cli}
        servicio={modalEnvio.svc}
        estilista={modalEnvio.st}
        empresa={empresa}
        tipo={modalEnvio.tipo}
        numFactura={modalEnvio.num}
        onClose={()=>setModalEnvio(null)}
      />}
    </div>
  );
}
// ── NÓMINA ─────────────────────────────────────────────────────────
function PagoNominaModal({data,onClose,toast}){
  const [pm,setPm]=useState({metodo:"transferencia",ref:"",notas:""});
  const guardar=()=>{
    toast(`Pago de ${fmt(data.monto)} a ${data.member.name} registrado vía ${pm.metodo} ✓`);
    onClose();
  };
  return(
    <Modal title={`Registrar pago — ${data.member.name}`} onClose={onClose}>
      <div style={{...sx.card,padding:14,marginBottom:14,background:C.goldD,border:`1px solid ${C.gold}44`}}>
        <div style={{color:C.gold,fontWeight:800,fontSize:22}}>{fmt(data.monto)}</div>
        <div style={{color:C.muted,fontSize:12}}>Nómina neta · {data.periodo}</div>
      </div>
      <Row>
        <Fld lbl="Método de pago">
          <Sel value={pm.metodo} onChange={e=>setPm(p=>({...p,metodo:e.target.value}))}>
            {["transferencia","nequi","daviplata","efectivo","cheque","otro"].map(m=><option key={m} value={m}>{m.charAt(0).toUpperCase()+m.slice(1)}</option>)}
          </Sel>
        </Fld>
        <Fld lbl="Referencia / Comprobante"><Inp value={pm.ref} onChange={e=>setPm(p=>({...p,ref:e.target.value}))} placeholder="No. transacción, comprobante..."/></Fld>
      </Row>
      <Fld lbl="Notas"><Inp value={pm.notas} onChange={e=>setPm(p=>({...p,notas:e.target.value}))} placeholder="Observaciones del pago..."/></Fld>
      <div style={{display:"flex",gap:8,marginTop:16}}>
        <button style={{...sx.btn,background:C.green}} onClick={guardar}>✓ Confirmar pago</button>
        <button style={sx.ghost} onClick={onClose}>Cancelar</button>
      </div>
    </Modal>
  );
}

function Nomina({staff,setStaff,apts,sales,svcs,toast}){
  const [tab,setTab]=useState("nomina");
  const [modal,setModal]=useState(null);
  const [modoFecha,setModoFecha]=useState("mes"); // "mes" | "rango"
  const [month,setMonth]=useState(new Date().getMonth());
  const [fechaDesde,setFechaDesde]=useState(D0(-7));
  const [fechaHasta,setFechaHasta]=useState(D0(0));
  const [pagoModal,setPagoModal]=useState(null);
  const mNames=["Enero","Febrero","Marzo","Abril","Mayo","Junio","Jul","Ago","Sep","Oct","Nov","Dic"];

  // Filtrar por rango o mes
  const enRango=(fecha)=>{
    if(modoFecha==="mes") return new Date(fecha).getMonth()===month;
    return fecha>=fechaDesde && fecha<=fechaHasta;
  };

  const calc=(m)=>{
    const mApts=apts.filter(a=>a.tid===m.id&&a.status==="completed"&&enRango(a.date));
    const mSales=sales.filter(s=>s.tid===m.id&&enRango(s.date)&&s.type==="service");
    // Ventas reales cobradas (lo que realmente entró en caja)
    // Solo usar sales[] para que cuadre con la caja del día
    const allSales=[...mApts.map(a=>{
      // Buscar si hay una venta manual registrada para esta cita
      const svc=svcs.find(s=>s.id===a.sid);
      const ventaRegistrada=sales.find(v=>v.aptId===a.id||
        (v.tid===m.id&&v.date===a.date&&v.sid===a.sid&&v.type==="service"));
      if(ventaRegistrada) return{...ventaRegistrada,_fromApt:true};
      // Si no hay venta registrada, usar precio del catálogo como referencia
      return{amount:svc?.price||0,disc:0,tip:0,total:svc?.price||0,_fromApt:true,_sinCobro:true};
    }),...mSales];
    // Eliminar duplicados (si la misma cita aparece en ambas listas)
    const salesSinDup=allSales.filter((s,i,arr)=>
      !s._fromApt||!arr.slice(0,i).find(x=>!x._fromApt&&x.sid===s.sid&&x.date===s.date)
    );
    const totalSales=salesSinDup.reduce((a,s)=>a+calcBase(s),0);
    // Comisión sobre lo realmente cobrado
    const commission=salesSinDup.reduce((a,s)=>{
      const svc=svcs.find(x=>x.id===s.sid);
      const commPct=((svc?.comisionesPorStaff?.[m.id])||m.comm)/100;
      return a+calcBase(s)*commPct;
    },0);
    const healthE=m.base*0.04, pensionE=m.base*0.04;
    const healthR=m.base*0.085, pensionR=m.base*0.12;
    const paraf=m.base*0.09;
    const net=m.base+commission-healthE-pensionE;
    // Detalle de servicios realizados
    const serviciosDetalle=mApts.map(a=>{
      const svc=svcs.find(s=>s.id===a.sid);
      const commPct=(svc?.comisionesPorStaff?.[m.id])||m.comm;
      return{aptId:a.id,fecha:a.date,hora:a.time,svcName:svc?.name||"—",precio:svc?.price||0,comPct:commPct,comMonto:(svc?.price||0)*commPct/100};
    });
    return{totalSales,commission,net,healthE,pensionE,healthR,pensionR,paraf,total:net+healthR+pensionR+paraf,serviciosDetalle,aptCount:mApts.length};
  };

  function StaffForm({member}){
    const blank={name:"",role:"",color:C.gold,comm:40,base:1600000,phone:"",active:true,sched:{L:1,M:1,X:1,J:1,V:1,S:1,D:0}};
    const [f,setF]=useState(member||blank);
    const set=(k,v)=>setF(p=>({...p,[k]:v}));
    const colorOpts=[C.gold,C.rose,C.purple,C.blue,C.green,C.orange];
    const save=()=>{
      if(!f.name){toast("El nombre es requerido","error");return;}
      if(member){setStaff(p=>p.map(s=>s.id===member.id?{...f,comm:+f.comm,base:+f.base}:s));}
      else{setStaff(p=>[...p,{...f,id:uid(),comm:+f.comm,base:+f.base}]);}
      toast(member?"Actualizado":"Empleado creado");setModal(null);
    };
    return(
      <Modal title={member?"Editar empleado":"Nuevo empleado"} onClose={()=>setModal(null)}>
        <Row><Fld lbl="Nombre *"><Inp value={f.name} onChange={e=>set("name",e.target.value)}/></Fld><Fld lbl="Cargo"><Inp value={f.role} onChange={e=>set("role",e.target.value)}/></Fld></Row>
        <Row><Fld lbl="Teléfono"><Inp value={f.phone} onChange={e=>set("phone",e.target.value)}/></Fld><Fld lbl="Estado"><Sel value={f.active} onChange={e=>set("active",e.target.value==="true")}><option value="true">Activo</option><option value="false">Inactivo</option></Sel></Fld></Row>
        <Row>
          <Fld lbl="Salario base mensual (COP)">
            <Inp type="number" value={f.base} onChange={e=>set("base",+e.target.value)} placeholder="2000000"/>
            <div style={{color:C.gold,fontSize:11,marginTop:3}}>= {fmt(+f.base||0)}/mes</div>
          </Fld>
          <Fld lbl="Comisión sobre ventas (%)">
            <div style={{display:"flex",gap:6,alignItems:"center"}}>
              <Inp type="number" value={f.comm} onChange={e=>set("comm",+e.target.value)} min={0} max={100} style={{flex:1}}/>
              <span style={{color:C.muted,fontSize:13}}>%</span>
            </div>
            <div style={{color:C.green,fontSize:11,marginTop:3}}>
              Ej: si vende $1M → comisión: {fmt(1000000*(+f.comm||0)/100)}
            </div>
          </Fld>
        </Row>
        <Row>
          <Fld lbl="Tipo de contrato">
            <Sel value={f.tipo||"indefinido"} onChange={e=>set("tipo",e.target.value)}>
              <option value="indefinido">Indefinido</option>
              <option value="fijo">Término fijo</option>
              <option value="prestacion">Prestación de servicios</option>
              <option value="obra">Obra o labor</option>
            </Sel>
          </Fld>
          <Fld lbl="Fecha de inicio">
            <Inp type="date" value={f.fechaInicio||""} onChange={e=>set("fechaInicio",e.target.value)}/>
          </Fld>
        </Row>
        <div style={{...sx.card,padding:12,background:C.goldD,border:`1px solid ${C.gold}44`,marginBottom:12}}>
          <div style={{color:C.muted,fontSize:10,textTransform:"uppercase",letterSpacing:1,marginBottom:8}}>Preview nómina (sobre $1.000.000 en ventas)</div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8}}>
            {[
              {l:"Base",v:fmt(+f.base||0),c:C.cream},
              {l:"Comisión",v:fmt(1000000*((+f.comm||0)/100)),c:C.green},
              {l:"- Salud 4%",v:`-${fmt((+f.base||0)*0.04)}`,c:C.orange},
              {l:"- Pensión 4%",v:`-${fmt((+f.base||0)*0.04)}`,c:C.orange},
              {l:"Neto estimado",v:fmt((+f.base||0)+1000000*((+f.comm||0)/100)-(+f.base||0)*0.08),c:C.goldL},
              {l:"Costo empresa",v:fmt((+f.base||0)+1000000*((+f.comm||0)/100)+(+f.base||0)*0.215),c:C.red},
            ].map(k=>(
              <div key={k.l} style={{textAlign:"center"}}>
                <div style={{color:k.c,fontWeight:700,fontSize:12}}>{k.v}</div>
                <div style={{color:C.muted,fontSize:9,marginTop:2}}>{k.l}</div>
              </div>
            ))}
          </div>
        </div>
        <Fld lbl="Color"><div style={{display:"flex",gap:8,marginTop:4}}>{colorOpts.map(c=><div key={c} onClick={()=>set("color",c)} style={{width:26,height:26,borderRadius:"50%",background:c,cursor:"pointer",border:`3px solid ${f.color===c?"#fff":"transparent"}`}}/>)}</div></Fld>
        <Fld lbl="Días laborales">
          <div style={{display:"flex",gap:5,marginTop:4}}>{DAYS.map(d=>(
            <button key={d} onClick={()=>setF(p=>({...p,sched:{...p.sched,[d]:p.sched?.[d]?0:1}}))} style={{width:34,height:34,borderRadius:6,border:`1px solid ${f.sched?.[d]?C.gold:C.border}`,background:f.sched?.[d]?C.goldD:"transparent",color:f.sched?.[d]?C.gold:C.muted,fontWeight:700,cursor:"pointer",fontSize:12}}>{d}</button>
          ))}</div>
        </Fld>
        <div style={{display:"flex",gap:8,marginTop:18}}><button style={sx.btn} onClick={save}>{member?"Guardar":"Crear"}</button><button style={sx.ghost} onClick={()=>setModal(null)}>Cancelar</button></div>
      </Modal>
    );
  }

  const totNet=staff.reduce((a,m)=>a+calc(m).net,0);
  const totCost=staff.reduce((a,m)=>a+calc(m).total,0);

  return(
    <div>
      {/* Filtro período nómina */}
      <div style={{...sx.card,padding:14,marginBottom:14}}>
        <div style={{display:"flex",gap:8,marginBottom:10,alignItems:"center",flexWrap:"wrap"}}>
          <span style={{color:C.muted,fontSize:11,fontWeight:600}}>Período:</span>
          <button onClick={()=>setModoFecha("mes")} style={{...(modoFecha==="mes"?sx.btn:sx.ghost),padding:"5px 12px",fontSize:11}}>Por mes</button>
          <button onClick={()=>setModoFecha("rango")} style={{...(modoFecha==="rango"?sx.btn:sx.ghost),padding:"5px 12px",fontSize:11}}>Rango de fechas</button>
          <div style={{marginLeft:"auto",display:"flex",gap:6}}>
            {["nomina","empleados"].map(t=><button key={t} onClick={()=>setTab(t)} style={{...(tab===t?sx.btn:sx.ghost),padding:"6px 12px",fontSize:11}}>{t==="nomina"?"Nómina":"Empleados"}</button>)}
            <button style={sx.btn} onClick={()=>setModal({type:"form",member:null})}>+ Empleado</button>
          </div>
        </div>
        {modoFecha==="mes"&&<div style={{display:"flex",gap:4,flexWrap:"wrap"}}>
          {mNames.map((m,i)=><button key={i} onClick={()=>setMonth(i)} style={{...(month===i?sx.btn:sx.ghost),padding:"5px 10px",fontSize:11}}>{m.slice(0,3)}</button>)}
        </div>}
        {modoFecha==="rango"&&<div style={{display:"flex",gap:10,alignItems:"flex-end",flexWrap:"wrap"}}>
          <Fld lbl="Desde"><Inp type="date" value={fechaDesde} onChange={e=>setFechaDesde(e.target.value)} style={{width:148}}/></Fld>
          <Fld lbl="Hasta"><Inp type="date" value={fechaHasta} onChange={e=>setFechaHasta(e.target.value)} style={{width:148}}/></Fld>
          <div style={{display:"flex",gap:5,paddingBottom:1}}>
            {[{l:"Hoy",d:0},{l:"7d",d:-7},{l:"15d",d:-15},{l:"30d",d:-30}].map(r=>(
              <button key={r.l} onClick={()=>{setFechaDesde(D0(r.d));setFechaHasta(D0(0));}} style={{...sx.ghost,padding:"5px 9px",fontSize:10}}>{r.l}</button>
            ))}
          </div>
        </div>}
      </div>

      {tab==="nomina"&&(<>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:18}}>
          <div style={{...sx.card,padding:16,border:`1px solid ${C.gold}44`}}><div style={{color:C.muted,fontSize:10,textTransform:"uppercase",letterSpacing:1,marginBottom:4}}>Nómina neta {mNames[month]}</div><div style={{color:C.gold,fontWeight:800,fontSize:22}}>{fmt(totNet)}</div></div>
          <div style={{...sx.card,padding:16,border:`1px solid ${C.red}44`}}><div style={{color:C.muted,fontSize:10,textTransform:"uppercase",letterSpacing:1,marginBottom:4}}>Costo total empresa</div><div style={{color:C.red,fontWeight:800,fontSize:22}}>{fmt(totCost)}</div><div style={{color:C.muted,fontSize:11}}>incluye prestaciones PILA</div></div>
        </div>
        {staff.filter(s=>s.active).map(member=>{
          const p=calc(member);
          return(
            <div key={member.id} style={{...sx.card,padding:20,marginBottom:14}}>
              <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:14}}>
                <Ava name={member.name} color={member.color} size={44}/>
                <div style={{flex:1}}><div style={{color:C.cream,fontWeight:700,fontSize:15}}>{member.name}</div><div style={{color:C.muted,fontSize:12}}>{member.role} · {member.comm}% comisión</div></div>
                <div style={{textAlign:"right"}}>
                  <div style={{color:C.green,fontWeight:800,fontSize:20}}>{fmt(p.net)}</div>
                  <div style={{color:C.muted,fontSize:11}}>pago neto</div>
                  <button style={{...sx.ghost,padding:"4px 10px",fontSize:10,marginTop:6,color:C.green,borderColor:C.green+"44"}}
                    onClick={()=>setPagoModal({member,monto:p.net,periodo:modoFecha==="mes"?mNames[month]:`${fechaDesde} al ${fechaHasta}`})}>
                    💳 Registrar pago
                  </button>
                </div>
              </div>
              <Divider/>
              <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(120px,1fr))",gap:10}}>
                {[
                  {l:"Salario base",v:fmt(member.base),c:C.cream},
                  {l:"Ventas período",v:fmt(p.totalSales),c:C.blue},
                  {l:"Comisión ganada",v:fmt(p.commission),c:C.green},
                  {l:"Salud empleado",v:`-${fmt(p.healthE)}`,c:C.orange},
                  {l:"Pensión empleado",v:`-${fmt(p.pensionE)}`,c:C.orange},
                  {l:"Salud empresa",v:fmt(p.healthR),c:C.red},
                  {l:"Pensión empresa",v:fmt(p.pensionR),c:C.red},
                  {l:"Parafiscales",v:fmt(p.paraf),c:C.red},
                  {l:"Citas realizadas",v:p.aptCount||0,c:C.purple},
                ].map(k=><div key={k.l} style={{background:C.surface,borderRadius:8,padding:"10px 12px"}}><div style={{color:C.muted,fontSize:10,textTransform:"uppercase",letterSpacing:1,marginBottom:3}}>{k.l}</div><div style={{color:k.c,fontWeight:700,fontSize:13}}>{k.v}</div></div>)}
              </div>
              {p.serviciosDetalle&&p.serviciosDetalle.length>0&&(
                <div style={{marginTop:12}}>
                  <div style={{color:C.muted,fontSize:10,textTransform:"uppercase",letterSpacing:1.2,marginBottom:8}}>Detalle servicios realizados</div>
                  <div style={{...sx.card,overflow:"hidden",background:C.surface}}>
                    <table style={{width:"100%",borderCollapse:"collapse"}}>
                      <thead><tr style={{borderBottom:`1px solid ${C.border}`}}>
                        {["Fecha","Hora","Servicio","Precio","Com%","Comisión"].map(h=>(
                          <th key={h} style={{color:C.muted,fontSize:9,letterSpacing:1,textTransform:"uppercase",padding:"7px 10px",textAlign:"left"}}>{h}</th>
                        ))}
                      </tr></thead>
                      <tbody>
                        {p.serviciosDetalle.map((d,idx)=>(
                          <tr key={d.aptId||idx} style={{borderBottom:idx<p.serviciosDetalle.length-1?`1px solid ${C.border}11`:"none",background:idx%2===0?"transparent":C.card}}>
                            <td style={{color:C.muted,padding:"6px 10px",fontSize:11}}>{d.fecha}</td>
                            <td style={{color:C.muted,padding:"6px 10px",fontSize:11}}>{d.hora}</td>
                            <td style={{color:C.cream,padding:"6px 10px",fontSize:12}}>{d.svcName}</td>
                            <td style={{color:C.blue,padding:"6px 10px",fontSize:12,fontWeight:600}}>{fmt(d.precio)}</td>
                            <td style={{color:C.orange,padding:"6px 10px",fontSize:11}}>{d.comPct}%</td>
                            <td style={{color:C.green,padding:"6px 10px",fontSize:12,fontWeight:700}}>{fmt(d.comMonto)}</td>
                          </tr>
                        ))}
                      </tbody>
                      <tfoot><tr style={{borderTop:`1px solid ${C.gold}44`}}>
                        <td colSpan={3} style={{color:C.gold,padding:"7px 10px",fontSize:10,textTransform:"uppercase",letterSpacing:1}}>Total</td>
                        <td style={{color:C.blue,padding:"7px 10px",fontWeight:700}}>{fmt(p.totalSales)}</td>
                        <td/>
                        <td style={{color:C.green,padding:"7px 10px",fontWeight:800,fontSize:13}}>{fmt(p.commission)}</td>
                      </tr></tfoot>
                    </table>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </>)}

      {tab==="empleados"&&(
        <div style={{display:"flex",flexDirection:"column",gap:10}}>
          {staff.map(member=>(
            <div key={member.id} style={{...sx.card,padding:18,display:"flex",alignItems:"center",gap:14}}>
              <Ava name={member.name} color={member.color} size={46}/>
              <div style={{flex:1}}>
                <div style={{color:C.cream,fontWeight:700,fontSize:15}}>{member.name}</div>
                <div style={{color:C.muted,fontSize:12}}>{member.role} · {member.phone}</div>
                <div style={{display:"flex",gap:4,marginTop:6}}>{DAYS.map(d=><span key={d} style={{width:20,height:20,borderRadius:4,display:"inline-flex",alignItems:"center",justifyContent:"center",fontSize:9,fontWeight:700,background:member.sched?.[d]?member.color+"33":"transparent",color:member.sched?.[d]?member.color:C.border}}>{d}</span>)}</div>
              </div>
              <div style={{textAlign:"right"}}>
                <div style={{color:C.goldL,fontWeight:700,fontSize:14}}>{fmt(member.base)}</div>
                <div style={{color:C.green,fontSize:12}}>+{member.comm}% comisión</div>
                <Badge c={member.active?C.green:C.muted} sm>{member.active?"Activo":"Inactivo"}</Badge>
              </div>
              <button style={{...sx.ghost,padding:"7px 12px",fontSize:12}} onClick={()=>setModal({type:"form",member})}>Editar</button>
            </div>
          ))}
        </div>
      )}
      {modal?.type==="form"&&<StaffForm member={modal.member}/>}
{pagoModal&&<PagoNominaModal data={pagoModal} onClose={()=>setPagoModal(null)} toast={toast}/>}
    </div>
  );
}

// ── INVENTARIO ─────────────────────────────────────────────────────
function Inventario({inv,setInv,toast}){
  const [cat,setCat]=useState("all");
  const [q,setQ]=useState("");
  const [tab,setTab]=useState("stock");
  const [modal,setModal]=useState(null);
  const [entradas,setEntradas]=useState({}); // cantidades a agregar por item
  const cats=["all",...new Set(inv.map(i=>i.cat).filter(Boolean))];
  const list=inv.filter(i=>(cat==="all"||i.cat===cat)&&i.name.toLowerCase().includes(q.toLowerCase()));
  const low=inv.filter(i=>i.stock<=i.min);
  const valorTotal=inv.reduce((a,b)=>a+((+b.stock||0)*(+b.cost||0)),0);

  const ajustar=(id,delta)=>setInv(p=>p.map(i=>i.id===id?{...i,stock:Math.max(0,(+i.stock||0)+delta)}:i));
  const agregarStock=(id)=>{
    const cant=+entradas[id]||0;
    if(cant<=0){toast("Ingresa una cantidad mayor a 0","error");return;}
    setInv(p=>p.map(i=>i.id===id?{...i,stock:(+i.stock||0)+cant}:i));
    setEntradas(p=>({...p,[id]:""}));
    toast(`+${cant} unidades agregadas ✓`);
  };

  function ItemForm({item}){
    const blank={name:"",cat:"Retail",stock:0,min:5,cost:0,sale:0,unit:"unidad",supplier:"",barcode:"",desc:""};
    const [f,setF]=useState(item||blank);
    const set=(k,v)=>setF(p=>({...p,[k]:v}));
    const [addQty,setAddQty]=useState("");
    const save=()=>{
      if(!f.name){toast("El nombre es requerido","error");return;}
      const fn={...f,stock:+f.stock,min:+f.min,cost:+f.cost,sale:+f.sale};
      if(addQty&&+addQty>0) fn.stock=(+f.stock||0)+(+addQty);
      if(item){setInv(p=>p.map(i=>i.id===item.id?fn:i));}
      else{setInv(p=>[...p,{...fn,id:uid()}]);}
      toast(item?"Producto actualizado ✓":"Producto creado ✓");setModal(null);
    };
    const del=()=>{setInv(p=>p.filter(i=>i.id!==item.id));toast("Eliminado","warn");setModal(null);};
    const genBarcode=()=>set("barcode",String(Date.now()).slice(-13));
    const margin=f.sale>0&&f.cost>0?((f.sale-f.cost)/f.sale*100).toFixed(1):null;

    return(
      <Modal title={item?"Editar producto":"Nuevo producto"} onClose={()=>setModal(null)} w={580}>
        {/* Datos básicos */}
        <div style={{...sx.card,padding:14,marginBottom:12}}>
          <div style={{color:C.muted,fontSize:10,textTransform:"uppercase",letterSpacing:1,marginBottom:10}}>Datos del producto</div>
          <Row>
            <Fld lbl="Nombre del producto *"><Inp value={f.name} onChange={e=>set("name",e.target.value)} placeholder="Shampoo Sin Sulfatos 300ml"/></Fld>
            <Fld lbl="Categoría">
              <Inp value={f.cat} onChange={e=>set("cat",e.target.value)} placeholder="Retail, Insumos..."/>
              <div style={{display:"flex",gap:4,flexWrap:"wrap",marginTop:5}}>
                {["Retail","Insumos","Extensiones","Kits","Accesorios","Coloración","Biomédico","Regalos"].map(c=>(
                  <button key={c} type="button" onClick={()=>set("cat",c)}
                    style={{...sx.ghost,padding:"2px 7px",fontSize:10,
                      background:f.cat===c?C.goldD:"transparent",
                      color:f.cat===c?C.gold:C.muted,
                      border:`1px solid ${f.cat===c?C.gold:C.border}`}}>
                    {c}
                  </button>
                ))}
              </div>
            </Fld>
          </Row>
          <Row>
            <Fld lbl="Unidad de medida">
              <Sel value={f.unit} onChange={e=>set("unit",e.target.value)}>
                {["unidad","botella","kit","paquete","caja","litro","ml","kg","g"].map(u=><option key={u}>{u}</option>)}
              </Sel>
            </Fld>
            <Fld lbl="Proveedor"><Inp value={f.supplier||""} onChange={e=>set("supplier",e.target.value)} placeholder="L'Oréal, Belleza Pro..."/></Fld>
          </Row>
          <Fld lbl="Descripción"><Inp value={f.desc||""} onChange={e=>set("desc",e.target.value)} placeholder="Breve descripción del producto..."/></Fld>
        </div>

        {/* Código de barras */}
        <div style={{...sx.card,padding:14,marginBottom:12}}>
          <div style={{color:C.muted,fontSize:10,textTransform:"uppercase",letterSpacing:1,marginBottom:10}}>Código de barras</div>
          <div style={{display:"flex",gap:6,marginBottom:8}}>
            <Inp value={f.barcode||""} onChange={e=>set("barcode",e.target.value.replace(/\D/g,""))} placeholder="Ej: 7701234560001 (solo números)" style={{flex:1}}/>
            <button type="button" style={{...sx.ghost,flexShrink:0,padding:"9px 12px",fontSize:11}} onClick={genBarcode}>Generar</button>
          </div>
          {f.barcode&&<BarcodeDisplay value={f.barcode}/>}
        </div>

        {/* Stock */}
        <div style={{...sx.card,padding:14,marginBottom:12}}>
          <div style={{color:C.muted,fontSize:10,textTransform:"uppercase",letterSpacing:1,marginBottom:10}}>Control de inventario</div>
          <Row cols={3}>
            <Fld lbl="Stock actual">
              <Inp type="number" value={f.stock} onChange={e=>set("stock",+e.target.value)} min={0}/>
            </Fld>
            <Fld lbl="Stock mínimo (alerta)">
              <Inp type="number" value={f.min} onChange={e=>set("min",+e.target.value)} min={0}/>
            </Fld>
            <Fld lbl="➕ Agregar al stock">
              <div style={{display:"flex",gap:5}}>
                <Inp type="number" value={addQty} onChange={e=>setAddQty(e.target.value)} placeholder="0" min={0} style={{flex:1}}/>
              </div>
              {addQty&&+addQty>0&&<div style={{color:C.green,fontSize:11,marginTop:3}}>Nuevo total: {(+f.stock||0)+(+addQty)} unidades</div>}
            </Fld>
          </Row>
        </div>

        {/* Precios */}
        <div style={{...sx.card,padding:14,marginBottom:12}}>
          <div style={{color:C.muted,fontSize:10,textTransform:"uppercase",letterSpacing:1,marginBottom:10}}>Precios</div>
          <Row>
            <Fld lbl="Costo unitario (COP)"><Inp type="number" value={f.cost} onChange={e=>set("cost",+e.target.value)} min={0}/></Fld>
            <Fld lbl="Precio de venta (COP)"><Inp type="number" value={f.sale} onChange={e=>set("sale",+e.target.value)} min={0}/></Fld>
          </Row>
          {margin&&(
            <div style={{...sx.card,padding:10,background:+margin>30?C.greenD:C.orangeD,border:`1px solid ${+margin>30?C.green:C.orange}44`,marginTop:4}}>
              <div style={{color:+margin>30?C.green:C.orange,fontSize:13}}>
                Margen: <b>{margin}%</b> &nbsp;·&nbsp; Ganancia por unidad: {fmt(f.sale-f.cost)} &nbsp;·&nbsp; Valor en bodega: {fmt((+f.stock||0)*f.cost)}
              </div>
            </div>
          )}
        </div>

        <div style={{display:"flex",gap:8,marginTop:4}}>
          <button style={sx.btn} onClick={save}>{item?"Guardar cambios":"Crear producto"}</button>
          <button style={sx.ghost} onClick={()=>setModal(null)}>Cancelar</button>
          {item&&<button style={{...sx.danger,marginLeft:"auto"}} onClick={del}>Eliminar</button>}
        </div>
      </Modal>
    );
  }

  return(
    <div>
      {/* Header KPIs */}
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(120px,1fr))",gap:10,marginBottom:16}}>
        <KPI label="Valor en bodega" value={fmtM(valorTotal)} sub={`${inv.length} productos`} accent={C.gold} icon="📦"/>
        <KPI label="Stock bajo" value={low.length} sub="bajo mínimo" accent={low.length>0?C.red:C.green} icon="⚠️"/>
        <KPI label="Total unidades" value={inv.reduce((a,b)=>a+(+b.stock||0),0)} sub="en inventario" accent={C.blue} icon="🔢"/>
        <KPI label="Con código barras" value={inv.filter(i=>i.barcode).length} sub="de {inv.length}" accent={C.purple} icon="🔲"/>
      </div>

      {/* Filtros */}
      <div style={{display:"flex",gap:8,marginBottom:12,flexWrap:"wrap",justifyContent:"space-between",alignItems:"center"}}>
        <Inp value={q} onChange={e=>setQ(e.target.value)} placeholder="🔍 Buscar por nombre, código o proveedor..." style={{flex:1,minWidth:200}}/>
        <div style={{display:"flex",gap:6}}>
          {[{id:"stock",l:"📦 Stock"},{id:"alertas",l:`⚠ Alertas${low.length>0?" ("+low.length+")":""}`},{id:"entradas",l:"➕ Entradas"}].map(t=>(
            <button key={t.id} onClick={()=>setTab(t.id)} style={{...(tab===t.id?sx.btn:sx.ghost),padding:"7px 12px",fontSize:12}}>{t.l}</button>
          ))}
          <button style={sx.btn} onClick={()=>setModal({item:null})}>+ Producto</button>
        </div>
      </div>

      {/* Categorías */}
      <div style={{display:"flex",gap:5,marginBottom:14,flexWrap:"wrap"}}>
        {cats.map(c=>(
          <button key={c} onClick={()=>setCat(c)} style={{...(cat===c?sx.btn:sx.ghost),padding:"4px 11px",fontSize:11}}>
            {c==="all"?"Todos":c}
          </button>
        ))}
      </div>

      {/* TAB: STOCK */}
      {tab==="stock"&&(
        <div>
          {/* Tabla header */}
          <div style={{...sx.card,display:"grid",gridTemplateColumns:"2fr 1fr 1fr 1fr 1.2fr 0.5fr",padding:"8px 0",marginBottom:6}}>
            {["Producto","Categoría","Código","Stock","Precio costo/venta",""].map(h=>(
              <div key={h} style={{color:C.muted,fontSize:9,letterSpacing:1,textTransform:"uppercase",padding:"0 12px"}}>{h}</div>
            ))}
          </div>
          {list.map(item=>{
            const isLow=+item.stock<=(+item.min||0);
            const pct=Math.min(100,((+item.stock||0)/Math.max((+item.min||1)*2,1))*100);
            return(
              <div key={item.id} style={{...sx.card,marginBottom:6,border:`1px solid ${isLow?C.red+"44":C.border}`}}>
                <div style={{display:"grid",gridTemplateColumns:"2fr 1fr 1fr 1fr 1.2fr 0.5fr",alignItems:"center",padding:"0"}}>
                  {/* Nombre */}
                  <div style={{padding:"12px 12px"}}>
                    <div style={{display:"flex",gap:6,alignItems:"center"}}>
                      <div>
                        <div style={{color:C.cream,fontWeight:600,fontSize:13}}>{item.name}</div>
                        <div style={{color:C.muted,fontSize:11}}>{item.supplier||"—"} · {item.unit}</div>
                        {item.barcode&&<div style={{fontFamily:"monospace",fontSize:10,color:C.purple,marginTop:2}}>🔲 {item.barcode}</div>}
                      </div>
                    </div>
                    {/* Barra de stock */}
                    <div style={{marginTop:6,height:3,background:C.border,borderRadius:2,maxWidth:180}}>
                      <div style={{width:`${pct}%`,height:"100%",background:isLow?C.red:C.green,borderRadius:2}}/>
                    </div>
                    <div style={{color:C.muted,fontSize:9,marginTop:2}}>Mín: {item.min} · {isLow?"⚠ BAJO":"✓ OK"}</div>
                  </div>
                  {/* Cat */}
                  <div style={{padding:"12px 12px"}}>
                    <Badge c={C.blue} sm>{item.cat}</Badge>
                  </div>
                  {/* Código */}
                  <div style={{padding:"12px 12px",fontFamily:"monospace",color:C.muted,fontSize:11}}>
                    {item.barcode||"—"}
                  </div>
                  {/* Stock con controles */}
                  <div style={{padding:"12px 12px"}}>
                    <div style={{display:"flex",alignItems:"center",gap:6}}>
                      <button onClick={()=>ajustar(item.id,-1)} style={{width:24,height:24,borderRadius:"50%",background:C.surface,border:`1px solid ${C.border}`,color:C.cream,fontSize:14,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}>−</button>
                      <span style={{color:isLow?C.red:C.cream,fontWeight:800,fontSize:18,minWidth:30,textAlign:"center"}}>{item.stock}</span>
                      <button onClick={()=>ajustar(item.id,1)} style={{width:24,height:24,borderRadius:"50%",background:C.gold,border:"none",color:C.bg,fontSize:14,cursor:"pointer",fontWeight:800,display:"flex",alignItems:"center",justifyContent:"center"}}>+</button>
                    </div>
                  </div>
                  {/* Precios */}
                  <div style={{padding:"12px 12px"}}>
                    <div style={{color:C.muted,fontSize:11}}>Costo: {fmt(item.cost)}</div>
                    {item.sale>0&&<div style={{color:C.goldL,fontWeight:600,fontSize:12}}>Venta: {fmt(item.sale)}</div>}
                    <div style={{color:C.muted,fontSize:10}}>Total: {fmt((+item.stock||0)*(+item.cost||0))}</div>
                  </div>
                  {/* Edit */}
                  <div style={{padding:"12px 8px"}}>
                    <button style={{...sx.ghost,padding:"6px 8px",fontSize:12}} onClick={()=>setModal({item})}>✏</button>
                  </div>
                </div>
              </div>
            );
          })}
          {list.length===0&&<div style={{...sx.card,padding:40,textAlign:"center",color:C.muted}}>Sin productos en esta categoría</div>}
        </div>
      )}

      {/* TAB: ALERTAS */}
      {tab==="alertas"&&(
        <div>
          {low.length===0?(
            <div style={{...sx.card,padding:40,textAlign:"center"}}>
              <div style={{fontSize:40,marginBottom:10}}>✅</div>
              <div style={{color:C.green,fontWeight:700}}>Todo el inventario en niveles óptimos</div>
            </div>
          ):(
            <div>
              <div style={{color:C.red,fontWeight:700,marginBottom:12}}>{low.length} producto(s) por debajo del mínimo</div>
              {low.map(item=>(
                <div key={item.id} style={{...sx.card,padding:16,marginBottom:8,border:`1px solid ${C.red}44`,background:C.redD}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:10}}>
                    <div>
                      <div style={{color:C.cream,fontWeight:700,fontSize:14}}>{item.name}</div>
                      <div style={{color:C.muted,fontSize:12}}>{item.cat} · {item.supplier}</div>
                      {item.barcode&&<div style={{fontFamily:"monospace",color:C.muted,fontSize:11}}>🔲 {item.barcode}</div>}
                    </div>
                    <div style={{display:"flex",gap:10,alignItems:"center"}}>
                      <div style={{textAlign:"center"}}>
                        <div style={{color:C.red,fontWeight:900,fontSize:24}}>{item.stock}</div>
                        <div style={{color:C.muted,fontSize:10}}>actual / mín {item.min}</div>
                      </div>
                      <div style={{display:"flex",gap:5}}>
                        <button style={{...sx.btn,background:C.green,padding:"7px 12px",fontSize:12}} onClick={()=>ajustar(item.id,item.min-item.stock+item.min)}>Llenar a mín.</button>
                        <button style={{...sx.btn,background:C.gold,padding:"7px 12px",fontSize:12}} onClick={()=>ajustar(item.id,10)}>+10</button>
                        <button style={{...sx.ghost,padding:"7px 10px",fontSize:12}} onClick={()=>setModal({item})}>✏</button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB: ENTRADAS — sumar stock de bodega */}
      {tab==="entradas"&&(
        <div>
          <div style={{...sx.card,padding:14,marginBottom:14,background:C.greenD,border:`1px solid ${C.green}44`}}>
            <div style={{color:C.green,fontWeight:700,fontSize:13}}>📦 Registro de entradas de bodega</div>
            <div style={{color:C.muted,fontSize:12,marginTop:4}}>Ingresa la cantidad recibida para cada producto. El sistema sumará al stock existente.</div>
          </div>
          {list.map(item=>(
            <div key={item.id} style={{...sx.card,padding:"12px 16px",marginBottom:8,display:"flex",alignItems:"center",gap:12,flexWrap:"wrap"}}>
              <div style={{flex:1,minWidth:150}}>
                <div style={{color:C.cream,fontWeight:600,fontSize:13}}>{item.name}</div>
                <div style={{color:C.muted,fontSize:11}}>{item.cat} · Stock actual: <b style={{color:+item.stock<=(+item.min||0)?C.red:C.green}}>{item.stock} {item.unit}</b></div>
                {item.barcode&&<div style={{fontFamily:"monospace",color:C.muted,fontSize:10}}>🔲 {item.barcode}</div>}
              </div>
              <div style={{display:"flex",gap:8,alignItems:"center",flexShrink:0}}>
                <Inp type="number" min={0} placeholder="Cant. a agregar"
                  value={entradas[item.id]||""}
                  onChange={e=>setEntradas(p=>({...p,[item.id]:e.target.value}))}
                  style={{width:130}}/>
                <span style={{color:C.muted,fontSize:12}}>{item.unit}</span>
                {entradas[item.id]&&+entradas[item.id]>0&&(
                  <div style={{color:C.green,fontSize:11,whiteSpace:"nowrap"}}>
                    → {(+item.stock||0)+(+entradas[item.id]||0)} total
                  </div>
                )}
                <button style={{...sx.btn,background:C.green,padding:"8px 14px",fontSize:12,flexShrink:0}}
                  onClick={()=>agregarStock(item.id)}>
                  ➕ Agregar
                </button>
              </div>
            </div>
          ))}
          {list.length===0&&<div style={{color:C.muted,textAlign:"center",padding:40}}>Sin productos</div>}
        </div>
      )}

      {modal&&<ItemForm item={modal.item}/>}
    </div>
  );
}

function BarcodeDisplay({value}){
  if(!value) return null;
  const bars=String(value).split("").flatMap((d,i)=>{
    const n=parseInt(d)||0;
    return Array.from({length:n+2},(_,j)=>({w:j%2===0?2:1,h:j%3===0?32:22,fill:j%2===0}));
  });
  return(
    <div style={{textAlign:"center"}}>
      <div style={{display:"inline-flex",gap:1,alignItems:"flex-end",padding:"4px 0"}}>
        {bars.map((b,i)=>(
          <div key={i} style={{width:b.w,height:b.h,background:b.fill?C.cream:"transparent",flexShrink:0}}/>
        ))}
      </div>
      <div style={{fontFamily:"monospace",fontSize:12,color:C.cream,letterSpacing:3,marginTop:4}}>{value}</div>
    </div>
  );
}

function Marketplace({products,setProducts,orders,setOrders,clients,toast}){
  const [tab,setTab]=useState("tienda");
  const [modal,setModal]=useState(null);
  const [cart,setCart]=useState([]);

  const addCart=(p)=>{
    setCart(prev=>{const ex=prev.find(i=>i.pid===p.id);return ex?prev.map(i=>i.pid===p.id?{...i,qty:i.qty+1}:i):[...prev,{pid:p.id,qty:1,price:p.price}];});
    toast(`${p.name} agregado al carrito`);
  };
  const remCart=(pid)=>setCart(p=>p.filter(i=>i.pid!==pid));
  const cartTotal=cart.reduce((a,b)=>a+b.price*b.qty,0);

  function ProdForm({prod}){
    const blank={name:"",price:0,stock:10,cat:"Cuidado",img:"🧴",desc:"",active:true,featured:false,sold:0};
    const [f,setF]=useState(prod||blank);
    const set=(k,v)=>setF(p=>({...p,[k]:v}));
    const save=()=>{
      if(!f.name){toast("El nombre es requerido","error");return;}
      const fn={...f,price:+f.price,stock:+f.stock};
      if(prod){setProducts(p=>p.map(x=>x.id===prod.id?fn:x));}else{setProducts(p=>[...p,{...fn,id:uid(),sold:0}]);}
      toast(prod?"Producto actualizado":"Producto creado");setModal(null);
    };
    const del=()=>{setProducts(p=>p.filter(x=>x.id!==prod.id));toast("Eliminado","warn");setModal(null);};
    const emojis=["🧴","🫧","💧","✨","🌸","🔬","🎁","🌡️","🪮","💆","🧖","💛"];
    return(
      <Modal title={prod?"Editar producto":"Nuevo producto"} onClose={()=>setModal(null)}>
        <Row>
          <Fld lbl="Nombre del servicio *"><Inp value={f.name} onChange={e=>set("name",e.target.value)} placeholder="Ej: Tape-In Extensions"/></Fld>
          <Fld lbl="Categoría">
            <div style={{display:"flex",gap:6}}>
              <Inp value={f.cat} onChange={e=>set("cat",e.target.value)} placeholder="Ej: Extensiones" style={{flex:1}}/>
            </div>
            <div style={{display:"flex",gap:4,flexWrap:"wrap",marginTop:5}}>
              {[...new Set(svcs.map(s=>s.cat))].filter(Boolean).map(c=>(
                <button key={c} type="button" onClick={()=>set("cat",c)}
                  style={{...sx.ghost,padding:"3px 8px",fontSize:10,
                    background:f.cat===c?C.goldD:"transparent",
                    color:f.cat===c?C.gold:C.muted,
                    border:`1px solid ${f.cat===c?C.gold:C.border}`}}>
                  {c}
                </button>
              ))}
              {["Extensiones","Retail","Biomédico","Insumos","Accesorios","Coloración","Tratamiento","Kits","Regalos","Otro"].filter(c=>![...new Set(inv.map(i=>i.cat))].includes(c)).map(c=>(
                <button key={c} type="button" onClick={()=>set("cat",c)}
                  style={{...sx.ghost,padding:"3px 8px",fontSize:10,color:C.muted}}>
                  + {c}
                </button>
              ))}
            </div>
          </Fld>
        </Row>
        <Row><Fld lbl="Precio (COP)"><Inp type="number" value={f.price} onChange={e=>set("price",e.target.value)}/></Fld><Fld lbl="Stock"><Inp type="number" value={f.stock} onChange={e=>set("stock",e.target.value)}/></Fld></Row>
        <Fld lbl="Código de barras (EAN/UPC)">
          <div style={{display:"flex",gap:6}}>
            <Inp value={f.barcode||""} onChange={e=>set("barcode",e.target.value)} placeholder="Ej: 7701234560001" style={{flex:1}}/>
            <button type="button" style={{...sx.ghost,padding:"9px 12px",fontSize:12,flexShrink:0}} onClick={()=>set("barcode",String(Math.floor(Math.random()*9e12+1e12)))}>Generar</button>
          </div>
          {f.barcode&&<div style={{marginTop:8,padding:"10px 14px",background:C.surface,borderRadius:6,border:`1px solid ${C.border}`}}>
            <div style={{fontFamily:"monospace",fontSize:11,color:C.muted,marginBottom:6}}>Vista previa código de barras</div>
            <BarcodeDisplay value={f.barcode}/>
          </div>}
        </Fld>
        <Fld lbl="Descripción"><Txta value={f.desc} onChange={e=>set("desc",e.target.value)} placeholder="Describe el producto..."/></Fld>
        <Fld lbl="Emoji / Ícono">
          <div style={{display:"flex",gap:6,flexWrap:"wrap",marginTop:4}}>{emojis.map(e=><button key={e} onClick={()=>set("img",e)} style={{fontSize:20,padding:"4px 6px",background:f.img===e?C.goldD:"transparent",border:`1px solid ${f.img===e?C.gold:C.border}`,borderRadius:6,cursor:"pointer"}}>{e}</button>)}</div>
        </Fld>
        <Row>
          <Fld lbl="Visible en tienda"><Sel value={f.active} onChange={e=>set("active",e.target.value==="true")}><option value="true">Sí, publicado</option><option value="false">No, oculto</option></Sel></Fld>
          <Fld lbl="Destacado"><Sel value={f.featured} onChange={e=>set("featured",e.target.value==="true")}><option value="true">Sí, destacado</option><option value="false">No</option></Sel></Fld>
        </Row>
        <div style={{display:"flex",gap:8,marginTop:16}}><button style={sx.btn} onClick={save}>{prod?"Guardar":"Publicar"}</button><button style={sx.ghost} onClick={()=>setModal(null)}>Cancelar</button>{prod&&<button style={{...sx.danger,marginLeft:"auto"}} onClick={del}>Eliminar</button>}</div>
      </Modal>
    );
  }

  function CheckoutModal(){
    const [f,setF]=useState({cid:clients[0]?.id||"",pay:"nequi",addr:"",notes:""});
    const set=(k,v)=>setF(p=>({...p,[k]:v}));
    const confirm=()=>{
      if(!f.addr){toast("Ingresa la dirección de entrega","error");return;}
      const newOrder={id:uid(),cid:f.cid,items:[...cart],total:cartTotal,status:"pending",date:TODAY,pay:f.pay,addr:f.addr,notes:f.notes};
      setOrders(p=>[...p,newOrder]);
      setProducts(prev=>prev.map(p=>{const ci=cart.find(c=>c.pid===p.id);return ci?{...p,stock:Math.max(0,p.stock-ci.qty),sold:(p.sold||0)+ci.qty}:p;}));
      setCart([]);toast("¡Pedido creado exitosamente! 🎉");setModal(null);
    };
    return(
      <Modal title="Confirmar pedido" onClose={()=>setModal(null)}>
        <div style={{marginBottom:14}}>
          {cart.map(item=>{const p=products.find(x=>x.id===item.pid);return(
            <div key={item.pid} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"8px 0",borderBottom:`1px solid ${C.border}`}}>
              <div style={{display:"flex",gap:8,alignItems:"center"}}><span style={{fontSize:20}}>{p?.img}</span><div><div style={{color:C.cream,fontSize:13}}>{p?.name}</div><div style={{color:C.muted,fontSize:11}}>x{item.qty}</div></div></div>
              <div style={{display:"flex",alignItems:"center",gap:10}}><span style={{color:C.goldL,fontWeight:700}}>{fmt(item.price*item.qty)}</span><button onClick={()=>remCart(item.pid)} style={{background:"transparent",border:"none",color:C.red,cursor:"pointer",fontSize:16}}>×</button></div>
            </div>
          );})}
          <div style={{display:"flex",justifyContent:"space-between",padding:"12px 0",fontWeight:800}}><span style={{color:C.muted}}>Total</span><span style={{color:C.gold,fontSize:18}}>{fmt(cartTotal)}</span></div>
        </div>
        <Fld lbl="Cliente"><Sel value={f.cid} onChange={e=>set("cid",e.target.value)}>{clients.map(c=><option key={c.id} value={c.id}>{c.name}</option>)}</Sel></Fld>
        <Row style={{marginTop:10}}><Fld lbl="Pago"><Sel value={f.pay} onChange={e=>set("pay",e.target.value)}>{PAY_METHODS.map(m=><option key={m} value={m}>{m.charAt(0).toUpperCase()+m.slice(1)}</option>)}</Sel></Fld><Fld lbl="Dirección de entrega *"><Inp value={f.addr} onChange={e=>set("addr",e.target.value)} placeholder="Cra/Cl dirección, barrio..."/></Fld></Row>
        <Fld lbl="Notas del pedido"><Inp value={f.notes} onChange={e=>set("notes",e.target.value)} placeholder="Instrucciones especiales..."/></Fld>
        <div style={{display:"flex",gap:8,marginTop:16}}><button style={{...sx.btn,background:C.green}} onClick={confirm}>Confirmar pedido</button><button style={sx.ghost} onClick={()=>setModal(null)}>Cancelar</button></div>
      </Modal>
    );
  }

  const activeProds=products.filter(p=>p.active);
  const featured=activeProds.filter(p=>p.featured);

  return(
    <div>
      <div style={{display:"flex",gap:6,marginBottom:18,justifyContent:"space-between",alignItems:"center",flexWrap:"wrap"}}>
        <div style={{display:"flex",gap:5}}>
          {["tienda","admin","pedidos"].map(t=><button key={t} onClick={()=>setTab(t)} style={{...(tab===t?sx.btn:sx.ghost),padding:"7px 14px",fontSize:12}}>{t==="tienda"?"🛍 Tienda":t==="admin"?"⚙ Admin":"📦 Pedidos"}</button>)}
        </div>
        <div style={{display:"flex",gap:6,alignItems:"center"}}>
          {cart.length>0&&<button style={{...sx.btn,background:C.green,position:"relative"}} onClick={()=>setModal({type:"checkout"})}>
            🛒 Carrito · {fmt(cartTotal)}
            <span style={{position:"absolute",top:-6,right:-6,background:C.red,color:"#fff",borderRadius:"50%",width:18,height:18,fontSize:10,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:700}}>{cart.reduce((a,b)=>a+b.qty,0)}</span>
          </button>}
          {tab==="admin"&&<button style={sx.btn} onClick={()=>setModal({type:"form",prod:null})}>+ Producto</button>}
        </div>
      </div>

      {tab==="tienda"&&(
        <div>
          {featured.length>0&&(
            <div style={{marginBottom:24}}>
              <div style={{color:C.muted,fontSize:10,textTransform:"uppercase",letterSpacing:1.5,marginBottom:12}}>⭐ Productos destacados</div>
              <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))",gap:12}}>
                {featured.map(p=>(
                  <div key={p.id} style={{...sx.card,padding:18,border:`1px solid ${C.gold}44`,background:`linear-gradient(135deg,${C.bg},${C.goldD})`}}>
                    <div style={{fontSize:36,marginBottom:10,textAlign:"center"}}>{p.img}</div>
                    <div style={{color:C.cream,fontWeight:700,fontSize:14,marginBottom:4}}>{p.name}</div>
                    <div style={{color:C.muted,fontSize:12,marginBottom:10,lineHeight:1.4}}>{p.desc}</div>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                      <div style={{color:C.gold,fontWeight:800,fontSize:18}}>{fmt(p.price)}</div>
                      <button style={{...sx.btn,padding:"6px 14px",fontSize:12}} onClick={()=>addCart(p)} disabled={p.stock===0}>{p.stock===0?"Agotado":"Agregar"}</button>
                    </div>
                    <div style={{color:C.muted,fontSize:10,marginTop:6}}>Stock: {p.stock} · {p.sold||0} vendidos</div>
                  </div>
                ))}
              </div>
            </div>
          )}
          <div style={{color:C.muted,fontSize:10,textTransform:"uppercase",letterSpacing:1.5,marginBottom:12}}>Todos los productos</div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(180px,1fr))",gap:10}}>
            {activeProds.map(p=>(
              <div key={p.id} style={{...sx.card,padding:14}}>
                <div style={{fontSize:28,marginBottom:8,textAlign:"center"}}>{p.img}</div>
                <div style={{color:C.cream,fontWeight:600,fontSize:13,marginBottom:3}}>{p.name}</div>
                <div style={{color:C.muted,fontSize:11,marginBottom:8,lineHeight:1.4,height:32,overflow:"hidden"}}>{p.desc}</div>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                  <span style={{color:C.goldL,fontWeight:700,fontSize:15}}>{fmt(p.price)}</span>
                  <button style={{...sx.btn,padding:"5px 12px",fontSize:11}} onClick={()=>addCart(p)} disabled={p.stock===0}>{p.stock===0?"Agotado":"+"}</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab==="admin"&&(
        <div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(110px,1fr))",gap:10,marginBottom:16}}>
            {[{l:"Productos",v:products.length,c:C.cream},{l:"Activos",v:products.filter(p=>p.active).length,c:C.green},{l:"Ventas totales",v:products.reduce((a,b)=>a+(b.sold||0),0),c:C.gold},{l:"Ingresos estimados",v:fmtM(products.reduce((a,b)=>a+(b.sold||0)*b.price,0)),c:C.goldL}].map(k=>(
              <div key={k.l} style={{...sx.card,padding:12,textAlign:"center"}}><div style={{color:k.c,fontWeight:800,fontSize:17}}>{k.v}</div><div style={{color:C.muted,fontSize:10,marginTop:2,textTransform:"uppercase",letterSpacing:1}}>{k.l}</div></div>
            ))}
          </div>
          {products.map(p=>(
            <div key={p.id} style={{...sx.card,padding:"13px 16px",marginBottom:8,display:"flex",alignItems:"center",gap:12,opacity:p.active?1:0.55}}>
              <span style={{fontSize:26}}>{p.img}</span>
              <div style={{flex:1}}>
                <div style={{color:C.cream,fontWeight:600,fontSize:13}}>{p.name}</div>
                <div style={{color:C.muted,fontSize:11}}>{p.cat} · {p.sold||0} vendidos · Stock: {p.stock}</div>
                {p.barcode&&<div style={{fontFamily:"monospace",fontSize:10,color:C.muted,marginTop:2}}>🔢 {p.barcode}</div>}
              </div>
              <div style={{textAlign:"right",minWidth:80}}><div style={{color:C.goldL,fontWeight:700}}>{fmt(p.price)}</div>{p.featured&&<Badge c={C.gold} sm>Destacado</Badge>}</div>
              <Badge c={p.active?C.green:C.muted} sm>{p.active?"Activo":"Oculto"}</Badge>
              <button style={{...sx.ghost,padding:"6px 10px",fontSize:11}} onClick={()=>setModal({type:"form",prod:p})}>✏</button>
            </div>
          ))}
        </div>
      )}

      {tab==="pedidos"&&(
        <div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(110px,1fr))",gap:10,marginBottom:16}}>
            {Object.entries(ORDER_STATUS).map(([k,v])=>{const n=orders.filter(o=>o.status===k).length;return n>0&&(
              <div key={k} style={{...sx.card,padding:12,textAlign:"center"}}><div style={{color:v.c,fontWeight:800,fontSize:18}}>{n}</div><div style={{color:C.muted,fontSize:10,marginTop:2}}>{v.l}</div></div>
            );})}
          </div>
          {orders.length===0&&<div style={{color:C.muted,textAlign:"center",padding:40}}>Sin pedidos registrados aún</div>}
          {[...orders].sort((a,b)=>b.date.localeCompare(a.date)).map(order=>{
            const cli=clients.find(c=>c.id===order.cid);
            const os=ORDER_STATUS[order.status]||ORDER_STATUS.pending;
            return(
              <div key={order.id} style={{...sx.card,padding:16,marginBottom:10}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:10}}>
                  <div><div style={{color:C.cream,fontWeight:700,fontSize:14}}>{cli?.name||"Cliente"}</div><div style={{color:C.muted,fontSize:11}}>{order.date} · {order.pay} · {order.addr}</div></div>
                  <div style={{display:"flex",gap:8,alignItems:"center"}}>
                    <span style={{color:C.goldL,fontWeight:800,fontSize:16}}>{fmt(order.total)}</span>
                    <Sel value={order.status} onChange={e=>setOrders(p=>p.map(o=>o.id===order.id?{...o,status:e.target.value}:o))} style={{width:140,padding:"5px 8px",fontSize:11}}>
                      {Object.entries(ORDER_STATUS).map(([k,v])=><option key={k} value={k}>{v.l}</option>)}
                    </Sel>
                  </div>
                </div>
                <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
                  {order.items.map(item=>{const p=products.find(x=>x.id===item.pid);return(
                    <div key={item.pid} style={{display:"flex",gap:6,alignItems:"center",background:C.surface,borderRadius:6,padding:"4px 10px"}}>
                      <span>{p?.img}</span><span style={{color:C.cream,fontSize:12}}>{p?.name}</span><span style={{color:C.muted,fontSize:11}}>×{item.qty}</span>
                    </div>
                  );})}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {modal?.type==="form"&&<ProdForm prod={modal.prod}/>}
      {modal?.type==="checkout"&&<CheckoutModal/>}
    </div>
  );
}

// ── CITAS ONLINE (PUBLIC BOOKING) ──────────────────────────────────
function CitasOnline({svcs,staff,apts,setApts,toast,empresa,setEmpresa}){
  const [tab,setTab]=useState("formulario");
  const [step,setStep]=useState(1);
  const [selSvc,setSelSvc]=useState(null);
  const [selStaff,setSelStaff]=useState(null);
  const [selDate,setSelDate]=useState("");
  const [selTime,setSelTime]=useState("");
  const [form,setForm]=useState({name:"",phone:"",email:"",notes:""});
  const [booked,setBooked]=useState(false);
  const [urlCopied,setUrlCopied]=useState(false);

  // Configuración editable de la página de citas
  const cfg = empresa?.bookingCfg || {
    whatsapp: "573164474596",
    instagram: "jimmyexpression",
    tiktok: "jimmyexpression",
    facebook: "",
    web: "jimmyexpression.com",
    urlPersonalizada: "",
    tituloBooking: "Reserva tu cita",
    subtituloBooking: "Agenda online en segundos · Confirmación por WhatsApp",
    colorBanner: "#C9A84C",
    mostrarPrecios: true,
    mostrarEstilistas: true,
    anticipoRequerido: "no",
    avisoMinimo: "2",
    cancelacionHasta: "24",
    mensajeConfirmacion: "Gracias por agendar en Jimmy Expression. Te confirmaremos tu cita por WhatsApp en menos de 2 horas. ¡Te esperamos! ✨",
    activarFormulario: true,
    redirigirWhatsapp: false,
  };

  const saveCfg = (newCfg) => {
    setEmpresa(p => ({...p, bookingCfg: {...cfg, ...newCfg}}));
    toast("Configuración guardada ✓");
  };

  const WA_URL = `https://wa.me/${cfg.whatsapp}`;
  const BOOKING_URL = cfg.urlPersonalizada || `https://${cfg.web}/reservar`;

  const copyUrl = (url) => {
    navigator.clipboard?.writeText(url).catch(()=>{});
    setUrlCopied(true);
    setTimeout(()=>setUrlCopied(false), 2000);
    toast("URL copiada ✓");
  };

  const openWA = (msg="") => {
    const text = encodeURIComponent(msg || `Hola Jimmy Expression, quiero agendar una cita.`);
    window.open(`https://wa.me/${cfg.whatsapp}?text=${text}`, "_blank");
  };

  const getSlots = (date, staffId) => {
    if(!date || !staffId) return [];
    const existing = apts.filter(a=>a.date===date&&a.tid===staffId&&a.status!=="cancelled").map(a=>a.time);
    return ["09:00","09:30","10:00","10:30","11:00","11:30","12:00","13:00","13:30","14:00","14:30","15:00","15:30","16:00","16:30","17:00"].filter(t=>!existing.includes(t));
  };
  const slots = getSlots(selDate, selStaff?.id);

  const confirmBook = () => {
    if(!form.name || !form.phone){toast("Nombre y teléfono requeridos","error");return;}
    if(cfg.redirigirWhatsapp){
      const svcName = selSvc?.name || "servicio";
      const msg = `Hola! Me llamo ${form.name} y quiero agendar:\n\n📋 Servicio: ${svcName}\n👤 Estilista: ${selStaff?.name}\n📅 Fecha: ${selDate}\n⏰ Hora: ${selTime}\n📞 Teléfono: ${form.phone}${form.notes?`\n📝 Notas: ${form.notes}`:""}`;
      openWA(msg);
      setBooked(true);
      return;
    }
    const newApt = {id:uid(),cid:"online_"+uid(),sid:selSvc.id,tid:selStaff.id,date:selDate,time:selTime,end:"",status:"pending",notes:form.notes,dep:0,paid:false,clientName:form.name,clientPhone:form.phone,clientEmail:form.email,online:true};
    setApts(p=>[...p,newApt]);
    setBooked(true);
    toast("¡Cita agendada! Aparece como pendiente en la agenda.");
  };

  const resetBook = () => {
    setStep(1);setSelSvc(null);setSelStaff(null);
    setSelDate("");setSelTime("");
    setForm({name:"",phone:"",email:"",notes:""});
    setBooked(false);
  };

  const pendingOnline = apts.filter(a=>a.online&&a.status==="pending");

  // ── CONFIG TAB STATE ──────────────────────────────
  const [cfgLocal, setCfgLocal] = useState({...cfg});
  const setCL = (k,v) => setCfgLocal(p=>({...p,[k]:v}));

  return(
    <div>
      {/* Tabs */}
      <div style={{display:"flex",gap:6,marginBottom:18,flexWrap:"wrap"}}>
        {[
          {id:"formulario",label:"🌐 Formulario público"},
          {id:"config",label:"⚙ Configuración"},
          {id:"redes",label:"📱 Redes & Links"},
          {id:"pendientes",label:`📋 Pendientes${pendingOnline.length>0?" ("+pendingOnline.length+")":""}` },
        ].map(t=>(
          <button key={t.id} onClick={()=>setTab(t.id)}
            style={{...(tab===t.id?sx.btn:sx.ghost),padding:"7px 14px",fontSize:12}}>
            {t.label}
          </button>
        ))}
      </div>

      {/* ── FORMULARIO PÚBLICO ── */}
      {tab==="formulario"&&(
        <div style={{...sx.card,padding:0,overflow:"hidden",border:`1px solid ${C.gold}44`}}>
          {/* Banner */}
          <div style={{background:`linear-gradient(135deg,#0a0a0a,#1a1208)`,padding:"28px 24px 20px",borderBottom:`1px solid ${C.border}`}}>
            <div style={{textAlign:"center"}}>
              <div style={{color:C.gold,fontSize:11,letterSpacing:3,textTransform:"uppercase",marginBottom:6}}>
                {empresa?.nombre||"Jimmy Expression"} · {empresa?.ciudad||"Medellín"}
              </div>
              <div style={{color:C.cream,fontSize:26,fontWeight:800,letterSpacing:-0.5}}>
                {cfg.tituloBooking}
              </div>
              <div style={{color:C.muted,fontSize:13,marginTop:4}}>{cfg.subtituloBooking}</div>
              {/* Paso a paso */}
              <div style={{display:"flex",justifyContent:"center",gap:4,marginTop:16}}>
                {[1,2,3,4].map(s=>(
                  <div key={s} style={{display:"flex",alignItems:"center",gap:4}}>
                    <div style={{width:s<=step?28:22,height:s<=step?28:22,borderRadius:"50%",background:s<step?C.green:s===step?C.gold:C.border,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:700,color:s<=step?C.bg:C.muted,transition:"all .3s"}}>
                      {s<step?"✓":s}
                    </div>
                    {s<4&&<div style={{width:24,height:2,background:s<step?C.green:C.border,borderRadius:1}}/>}
                  </div>
                ))}
              </div>
              <div style={{color:C.muted,fontSize:11,marginTop:8}}>
                {["","Elige servicio","Elige estilista","Fecha y hora","Tus datos"][step]}
              </div>
            </div>
          </div>

          <div style={{padding:24,maxWidth:580,margin:"0 auto"}}>
            {!booked?(<>
              {/* PASO 1 — SERVICIO */}
              {step===1&&(
                <div>
                  <div style={{color:C.cream,fontWeight:700,fontSize:16,marginBottom:16}}>¿Qué servicio deseas?</div>
                  {[...new Set(svcs.filter(s=>s.active).map(s=>s.cat))].map(cat=>(
                    <div key={cat} style={{marginBottom:18}}>
                      <div style={{color:C.muted,fontSize:10,textTransform:"uppercase",letterSpacing:1.5,marginBottom:8}}>{cat}</div>
                      {svcs.filter(s=>s.active&&s.cat===cat).map(svc=>(
                        <div key={svc.id} onClick={()=>{setSelSvc(svc);setStep(cfg.mostrarEstilistas?2:3);}}
                          style={{...sx.card,padding:"14px 16px",marginBottom:8,cursor:"pointer",
                            border:`1px solid ${selSvc?.id===svc.id?svc.color:C.border}`,
                            background:selSvc?.id===svc.id?svc.color+"15":C.card,
                            display:"flex",justifyContent:"space-between",alignItems:"center",transition:"all .15s"}}
                          onMouseEnter={e=>e.currentTarget.style.background=svc.color+"15"}
                          onMouseLeave={e=>e.currentTarget.style.background=selSvc?.id===svc.id?svc.color+"15":C.card}>
                          <div>
                            <div style={{color:C.cream,fontWeight:600,fontSize:14}}>{svc.img||"✂️"} {svc.name}</div>
                            <div style={{color:C.muted,fontSize:12,marginTop:3}}>{svc.desc||""}</div>
                            <div style={{color:C.muted,fontSize:11,marginTop:3}}>⏱ {svc.duration} min</div>
                          </div>
                          <div style={{textAlign:"right",flexShrink:0,marginLeft:12}}>
                            {cfg.mostrarPrecios&&<div style={{color:svc.color,fontWeight:800,fontSize:18}}>{fmt(svc.price)}</div>}
                            {selSvc?.id===svc.id&&<div style={{color:C.green,fontSize:12,marginTop:4}}>✓ Seleccionado</div>}
                          </div>
                        </div>
                      ))}
                    </div>
                  ))}
                  {/* WhatsApp alternativo */}
                  <div style={{...sx.card,padding:14,marginTop:8,background:C.greenD,border:`1px solid ${C.green}44`,textAlign:"center"}}>
                    <div style={{color:C.muted,fontSize:12,marginBottom:8}}>¿Prefieres agendar por WhatsApp?</div>
                    <button style={{...sx.btn,background:C.green,padding:"8px 20px"}} onClick={()=>openWA()}>
                      📲 Escribir por WhatsApp
                    </button>
                  </div>
                </div>
              )}

              {/* PASO 2 — ESTILISTA */}
              {step===2&&cfg.mostrarEstilistas&&(
                <div>
                  <button onClick={()=>setStep(1)} style={{...sx.ghost,padding:"6px 12px",fontSize:12,marginBottom:16}}>← Volver</button>
                  <div style={{color:C.cream,fontWeight:700,fontSize:16,marginBottom:6}}>Servicio seleccionado</div>
                  <div style={{...sx.card,padding:12,marginBottom:18,background:selSvc?.color+"15",border:`1px solid ${selSvc?.color}44`}}>
                    <div style={{color:selSvc?.color,fontWeight:700}}>{selSvc?.img} {selSvc?.name}</div>
                    <div style={{color:C.muted,fontSize:12,marginTop:2}}>{selSvc?.duration} min {cfg.mostrarPrecios&&`· ${fmt(selSvc?.price)}`}</div>
                  </div>
                  <div style={{color:C.cream,fontWeight:700,fontSize:16,marginBottom:14}}>¿Con quién quieres atenderte?</div>
                  {staff.filter(s=>s.active).map(st=>(
                    <div key={st.id} onClick={()=>{setSelStaff(st);setStep(3);}}
                      style={{...sx.card,padding:16,marginBottom:10,cursor:"pointer",
                        border:`1px solid ${selStaff?.id===st.id?st.color:C.border}`,
                        background:selStaff?.id===st.id?st.color+"15":C.card,
                        display:"flex",alignItems:"center",gap:14,transition:"all .15s"}}
                      onMouseEnter={e=>e.currentTarget.style.background=st.color+"15"}
                      onMouseLeave={e=>e.currentTarget.style.background=selStaff?.id===st.id?st.color+"15":C.card}>
                      <Ava name={st.name} color={st.color} size={44}/>
                      <div style={{flex:1}}>
                        <div style={{color:C.cream,fontWeight:700,fontSize:14}}>{st.name}</div>
                        <div style={{color:st.color,fontSize:12,marginTop:2}}>{st.role}</div>
                        <div style={{color:C.muted,fontSize:11,marginTop:3}}>
                          {Object.entries(st.sched||{}).filter(([,v])=>v).map(([d])=>d).join(" · ")}
                        </div>
                      </div>
                      {selStaff?.id===st.id&&<div style={{color:C.green,fontSize:22}}>✓</div>}
                    </div>
                  ))}
                  <button onClick={()=>{setSelStaff({id:"cualquiera",name:"Sin preferencia",color:C.muted});setStep(3);}}
                    style={{...sx.ghost,width:"100%",padding:12,marginTop:6,fontSize:13}}>
                    Cualquier estilista disponible
                  </button>
                </div>
              )}

              {/* PASO 3 — FECHA Y HORA */}
              {step===3&&(
                <div>
                  <button onClick={()=>setStep(cfg.mostrarEstilistas?2:1)} style={{...sx.ghost,padding:"6px 12px",fontSize:12,marginBottom:16}}>← Volver</button>
                  {/* Resumen */}
                  <div style={{...sx.card,padding:12,marginBottom:18,background:C.goldD,border:`1px solid ${C.gold}44`}}>
                    <div style={{color:C.gold,fontSize:13,fontWeight:600}}>{selSvc?.img} {selSvc?.name}</div>
                    {selStaff&&selStaff.id!=="cualquiera"&&<div style={{color:C.muted,fontSize:12,marginTop:2}}>👤 {selStaff.name}</div>}
                  </div>
                  <div style={{color:C.cream,fontWeight:700,fontSize:16,marginBottom:14}}>Elige tu fecha</div>
                  <Fld lbl="Fecha disponible">
                    <Inp type="date" value={selDate} onChange={e=>{setSelDate(e.target.value);setSelTime("");}}
                      min={D0(cfg.avisoMinimo==="2"?0:1)} style={{marginBottom:16,fontSize:15}}/>
                  </Fld>
                  {selDate&&(
                    <div>
                      <div style={{color:C.muted,fontSize:11,letterSpacing:1,textTransform:"uppercase",marginBottom:10}}>
                        Horarios disponibles — {new Date(selDate+"T00:00:00").toLocaleDateString("es-CO",{weekday:"long",day:"numeric",month:"long"})}
                      </div>
                      {slots.length===0?(
                        <div style={{...sx.card,padding:16,textAlign:"center",background:C.orangeD,border:`1px solid ${C.orange}44`}}>
                          <div style={{color:C.orange,fontWeight:600}}>Sin disponibilidad para esta fecha</div>
                          <div style={{color:C.muted,fontSize:12,marginTop:4}}>Por favor selecciona otro día</div>
                        </div>
                      ):(
                        <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:8}}>
                          {slots.map(t=>(
                            <button key={t} onClick={()=>{setSelTime(t);setStep(4);}}
                              style={{padding:"10px 0",background:selTime===t?C.gold:C.surface,
                                border:`1px solid ${selTime===t?C.gold:C.border}`,borderRadius:8,
                                color:selTime===t?C.bg:C.cream,fontWeight:selTime===t?700:400,
                                cursor:"pointer",fontSize:13,transition:"all .15s"}}>
                              {t}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* PASO 4 — DATOS */}
              {step===4&&(
                <div>
                  <button onClick={()=>setStep(3)} style={{...sx.ghost,padding:"6px 12px",fontSize:12,marginBottom:16}}>← Volver</button>
                  {/* Resumen cita */}
                  <div style={{...sx.card,padding:16,marginBottom:18,background:C.goldD,border:`1px solid ${C.gold}44`}}>
                    <div style={{color:C.gold,fontWeight:700,fontSize:14,marginBottom:4}}>📋 Resumen de tu cita</div>
                    <div style={{color:C.cream,fontSize:13}}>✂️ {selSvc?.name}</div>
                    {selStaff&&selStaff.id!=="cualquiera"&&<div style={{color:C.muted,fontSize:12,marginTop:2}}>👤 {selStaff.name}</div>}
                    <div style={{color:C.muted,fontSize:12,marginTop:2}}>📅 {selDate} &nbsp;⏰ {selTime}</div>
                    {cfg.mostrarPrecios&&<div style={{color:C.goldL,fontWeight:700,fontSize:15,marginTop:6}}>{fmt(selSvc?.price)}</div>}
                    {cfg.anticipoRequerido!=="no"&&(
                      <div style={{color:C.orange,fontSize:11,marginTop:6}}>
                        ⚠ Se requiere anticipo de {cfg.anticipoRequerido==="30pct"?"30% del servicio":fmt(+cfg.anticipoRequerido)} para confirmar
                      </div>
                    )}
                  </div>
                  <div style={{color:C.cream,fontWeight:700,fontSize:16,marginBottom:14}}>Tus datos de contacto</div>
                  <Fld lbl="Nombre completo *">
                    <Inp value={form.name} onChange={e=>setForm(p=>({...p,name:e.target.value}))} placeholder="Tu nombre completo" style={{marginBottom:10}}/>
                  </Fld>
                  <Fld lbl="WhatsApp *">
                    <Inp value={form.phone} onChange={e=>setForm(p=>({...p,phone:e.target.value}))} placeholder="+57 300 000 0000" style={{marginBottom:10}}/>
                  </Fld>
                  <Fld lbl="Email (opcional)">
                    <Inp value={form.email} onChange={e=>setForm(p=>({...p,email:e.target.value}))} type="email" placeholder="tu@email.com" style={{marginBottom:10}}/>
                  </Fld>
                  <Fld lbl="Notas para el estilista (opcional)">
                    <Txta value={form.notes} onChange={e=>setForm(p=>({...p,notes:e.target.value}))}
                      placeholder="Color deseado, alergias, referencias, peticiones especiales..." style={{marginBottom:16}}/>
                  </Fld>
                  <button style={{...sx.btn,width:"100%",padding:14,fontSize:15,background:cfg.redirigirWhatsapp?C.green:C.gold}}
                    onClick={confirmBook}>
                    {cfg.redirigirWhatsapp?"📲 Continuar por WhatsApp →":"✓ Confirmar cita"}
                  </button>
                  <div style={{color:C.muted,fontSize:11,textAlign:"center",marginTop:10}}>
                    {cfg.mensajeConfirmacion}
                  </div>
                </div>
              )}
            </>):(
              /* CONFIRMACIÓN */
              <div style={{textAlign:"center",padding:"32px 0"}}>
                <div style={{fontSize:56,marginBottom:14}}>{cfg.redirigirWhatsapp?"📲":"🎉"}</div>
                <div style={{color:C.goldL,fontWeight:800,fontSize:22,marginBottom:6}}>
                  {cfg.redirigirWhatsapp?"¡Redirigido a WhatsApp!":"¡Cita agendada!"}
                </div>
                <div style={{color:C.muted,fontSize:14,marginBottom:6}}>{selSvc?.name}</div>
                {selStaff&&selStaff.id!=="cualquiera"&&<div style={{color:C.muted,fontSize:13}}>con {selStaff.name}</div>}
                <div style={{color:C.cream,fontSize:14,margin:"8px 0 20px"}}>{selDate} · {selTime}</div>
                {!cfg.redirigirWhatsapp&&(
                  <div style={{...sx.card,padding:14,marginBottom:20,background:C.greenD,border:`1px solid ${C.green}44`}}>
                    <div style={{color:C.green,fontSize:13}}>{cfg.mensajeConfirmacion}</div>
                  </div>
                )}
                <div style={{display:"flex",gap:10,justifyContent:"center",flexWrap:"wrap"}}>
                  <button style={sx.btn} onClick={resetBook}>Agendar otra cita</button>
                  <button style={{...sx.btn,background:C.green}} onClick={()=>openWA()}>📲 Escribir a WhatsApp</button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── CONFIGURACIÓN ── */}
      {tab==="config"&&(
        <div>
          <div style={{...sx.card,padding:22,marginBottom:14}}>
            <div style={{color:C.cream,fontWeight:700,fontSize:15,marginBottom:16}}>Textos del formulario público</div>
            <Row>
              <Fld lbl="Título principal">
                <Inp value={cfgLocal.tituloBooking} onChange={e=>setCL("tituloBooking",e.target.value)}/>
              </Fld>
              <Fld lbl="Subtítulo">
                <Inp value={cfgLocal.subtituloBooking} onChange={e=>setCL("subtituloBooking",e.target.value)}/>
              </Fld>
            </Row>
            <Fld lbl="Mensaje de confirmación al cliente">
              <Txta value={cfgLocal.mensajeConfirmacion} onChange={e=>setCL("mensajeConfirmacion",e.target.value)} style={{minHeight:60}}/>
            </Fld>
          </div>

          <div style={{...sx.card,padding:22,marginBottom:14}}>
            <div style={{color:C.cream,fontWeight:700,fontSize:15,marginBottom:16}}>Opciones del formulario</div>
            <Row>
              <Fld lbl="Mostrar precios">
                <Sel value={cfgLocal.mostrarPrecios} onChange={e=>setCL("mostrarPrecios",e.target.value==="true")}>
                  <option value="true">Sí, mostrar precios</option>
                  <option value="false">No, ocultar precios</option>
                </Sel>
              </Fld>
              <Fld lbl="Mostrar selección de estilista">
                <Sel value={cfgLocal.mostrarEstilistas} onChange={e=>setCL("mostrarEstilistas",e.target.value==="true")}>
                  <option value="true">Sí, dejar elegir</option>
                  <option value="false">No, asignar automático</option>
                </Sel>
              </Fld>
            </Row>
            <Row>
              <Fld lbl="Anticipo requerido">
                <Sel value={cfgLocal.anticipoRequerido} onChange={e=>setCL("anticipoRequerido",e.target.value)}>
                  <option value="no">Sin anticipo</option>
                  <option value="50000">$50.000</option>
                  <option value="100000">$100.000</option>
                  <option value="30pct">30% del servicio</option>
                </Sel>
              </Fld>
              <Fld lbl="Aviso previo mínimo">
                <Sel value={cfgLocal.avisoMinimo} onChange={e=>setCL("avisoMinimo",e.target.value)}>
                  <option value="2">Mismo día (2h mínimo)</option>
                  <option value="24">24 horas antes</option>
                  <option value="48">48 horas antes</option>
                </Sel>
              </Fld>
            </Row>
            <Row>
              <Fld lbl="Cancelación hasta">
                <Sel value={cfgLocal.cancelacionHasta} onChange={e=>setCL("cancelacionHasta",e.target.value)}>
                  <option value="24">24 horas antes</option>
                  <option value="48">48 horas antes</option>
                  <option value="72">72 horas antes</option>
                </Sel>
              </Fld>
              <Fld lbl="Confirmación vía">
                <Sel value={cfgLocal.redirigirWhatsapp} onChange={e=>setCL("redirigirWhatsapp",e.target.value==="true")}>
                  <option value="false">Formulario (agenda directo en sistema)</option>
                  <option value="true">Redirigir a WhatsApp al finalizar</option>
                </Sel>
              </Fld>
            </Row>
            <div style={{...sx.card,padding:12,marginBottom:14,background:cfgLocal.redirigirWhatsapp?C.greenD:C.blueD,border:`1px solid ${cfgLocal.redirigirWhatsapp?C.green:C.blue}44`}}>
              <div style={{color:cfgLocal.redirigirWhatsapp?C.green:C.blue,fontSize:13}}>
                {cfgLocal.redirigirWhatsapp
                  ?"📲 Al confirmar la cita, el cliente será redirigido a WhatsApp con todos los datos prellenados."
                  :"📋 Al confirmar, la cita queda registrada en el sistema como 'Pendiente' y aparece en la Agenda."}
              </div>
            </div>
            <button style={sx.btn} onClick={()=>saveCfg(cfgLocal)}>Guardar configuración</button>
          </div>
        </div>
      )}

      {/* ── REDES & LINKS ── */}
      {tab==="redes"&&(
        <div>
          {/* URL de citas */}
          <div style={{...sx.card,padding:22,marginBottom:14,border:`1px solid ${C.gold}44`}}>
            <div style={{color:C.goldL,fontWeight:700,fontSize:16,marginBottom:6}}>🔗 Tu URL de reservas online</div>
            <div style={{color:C.muted,fontSize:13,marginBottom:14}}>Comparte este enlace donde quieras para recibir citas 24/7.</div>
            <Fld lbl="URL personalizada (deja vacío para usar la URL del sitio web)">
              <div style={{display:"flex",gap:8,marginBottom:10}}>
                <Inp value={cfgLocal.urlPersonalizada} onChange={e=>setCL("urlPersonalizada",e.target.value)}
                  placeholder={`https://${cfgLocal.web||"jimmyexpression.com"}/reservar`} style={{flex:1}}/>
                <button style={{...sx.btn,flexShrink:0}} onClick={()=>saveCfg(cfgLocal)}>Guardar</button>
              </div>
            </Fld>
            <div style={{display:"flex",gap:8,alignItems:"center",marginBottom:16}}>
              <div style={{flex:1,...sx.card,padding:"10px 14px",background:C.surface,color:C.goldL,fontWeight:600,fontSize:13}}>
                {cfgLocal.urlPersonalizada||`https://${cfgLocal.web||"jimmyexpression.com"}/reservar`}
              </div>
              <button style={{...sx.btn,flexShrink:0,padding:"10px 16px"}}
                onClick={()=>copyUrl(cfgLocal.urlPersonalizada||`https://${cfgLocal.web||"jimmyexpression.com"}/reservar`)}>
                {urlCopied?"✓ Copiada":"Copiar"}
              </button>
            </div>
            {/* WhatsApp directo */}
            <div style={{...sx.card,padding:14,background:C.greenD,border:`1px solid ${C.green}44`,marginBottom:10}}>
              <div style={{color:C.green,fontWeight:700,marginBottom:6}}>📲 Enlace directo a WhatsApp</div>
              <div style={{display:"flex",gap:8,alignItems:"center"}}>
                <div style={{flex:1,color:C.cream,fontSize:12,fontFamily:"monospace"}}>{WA_URL}</div>
                <button style={{...sx.btn,background:C.green,flexShrink:0,padding:"7px 14px",fontSize:12}}
                  onClick={()=>copyUrl(WA_URL)}>Copiar</button>
                <button style={{...sx.btn,background:C.green,flexShrink:0,padding:"7px 14px",fontSize:12}}
                  onClick={()=>openWA()}>Abrir</button>
              </div>
            </div>
          </div>

          {/* Redes sociales editables */}
          <div style={{...sx.card,padding:22,marginBottom:14}}>
            <div style={{color:C.cream,fontWeight:700,fontSize:15,marginBottom:16}}>📱 Redes sociales y contacto</div>
            <Row>
              <Fld lbl="📲 Número WhatsApp Business">
                <div style={{display:"flex",gap:6}}>
                  <Inp value={cfgLocal.whatsapp} onChange={e=>setCL("whatsapp",e.target.value.replace(/\D/g,""))}
                    placeholder="573164474596" style={{flex:1}}/>
                  <button style={{...sx.btn,background:C.green,padding:"9px 12px",fontSize:12,flexShrink:0}}
                    onClick={()=>window.open(`https://wa.me/${cfgLocal.whatsapp}`,"_blank")}>Test</button>
                </div>
                <div style={{color:C.muted,fontSize:10,marginTop:4}}>Solo números, incluye código de país. Ej: 573164474596</div>
              </Fld>
              <Fld lbl="🌐 Sitio web">
                <div style={{display:"flex",gap:6}}>
                  <Inp value={cfgLocal.web} onChange={e=>setCL("web",e.target.value)} placeholder="jimmyexpression.com" style={{flex:1}}/>
                  <button style={{...sx.ghost,padding:"9px 12px",fontSize:12,flexShrink:0}}
                    onClick={()=>window.open(`https://${cfgLocal.web}`,"_blank")}>Abrir</button>
                </div>
              </Fld>
            </Row>
            <Row>
              <Fld lbl="📸 Instagram (sin @)">
                <div style={{display:"flex",gap:6}}>
                  <Inp value={cfgLocal.instagram} onChange={e=>setCL("instagram",e.target.value.replace("@",""))}
                    placeholder="jimmyexpression" style={{flex:1}}/>
                  <button style={{...sx.ghost,padding:"9px 12px",fontSize:12,flexShrink:0}}
                    onClick={()=>window.open(`https://instagram.com/${cfgLocal.instagram}`,"_blank")}>Abrir</button>
                </div>
              </Fld>
              <Fld lbl="🎵 TikTok (sin @)">
                <div style={{display:"flex",gap:6}}>
                  <Inp value={cfgLocal.tiktok} onChange={e=>setCL("tiktok",e.target.value.replace("@",""))}
                    placeholder="jimmyexpression" style={{flex:1}}/>
                  <button style={{...sx.ghost,padding:"9px 12px",fontSize:12,flexShrink:0}}
                    onClick={()=>window.open(`https://tiktok.com/@${cfgLocal.tiktok}`,"_blank")}>Abrir</button>
                </div>
              </Fld>
            </Row>
            <Row>
              <Fld lbl="👍 Facebook">
                <Inp value={cfgLocal.facebook} onChange={e=>setCL("facebook",e.target.value)} placeholder="jimmyexpression"/>
              </Fld>
              <Fld lbl="▶ YouTube">
                <Inp value={cfgLocal.youtube||""} onChange={e=>setCL("youtube",e.target.value)} placeholder="@jimmyexpression"/>
              </Fld>
            </Row>
            <button style={sx.btn} onClick={()=>saveCfg(cfgLocal)}>Guardar todas las redes</button>
          </div>

          {/* Cards de uso */}
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(180px,1fr))",gap:10}}>
            {[
              {icon:"📸",label:"Instagram Bio",desc:"Agrega el link de citas en tu bio",url:`https://instagram.com/${cfgLocal.instagram}`,color:C.rose},
              {icon:"🎵",label:"TikTok Bio",desc:"Link en tu perfil de TikTok",url:`https://tiktok.com/@${cfgLocal.tiktok}`,color:C.purple},
              {icon:"📲",label:"WhatsApp Business",desc:"Botón de llamada a la acción",url:WA_URL,color:C.green},
              {icon:"🌐",label:"Sitio web",desc:"Botón 'Reservar' en tu web",url:`https://${cfgLocal.web}/reservar`,color:C.blue},
              {icon:"📍",label:"Google Maps",desc:"Link de citas en tu perfil",url:`https://${cfgLocal.web}/reservar`,color:C.gold},
            ].map(x=>(
              <div key={x.icon} style={{...sx.card,padding:14,border:`1px solid ${x.color}33`}}>
                <div style={{fontSize:24,marginBottom:6}}>{x.icon}</div>
                <div style={{color:C.cream,fontWeight:600,fontSize:12}}>{x.label}</div>
                <div style={{color:C.muted,fontSize:11,marginTop:3,lineHeight:1.4,marginBottom:10}}>{x.desc}</div>
                <button style={{...sx.ghost,padding:"5px 10px",fontSize:11,width:"100%"}}
                  onClick={()=>copyUrl(x.url)}>Copiar URL</button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── PENDIENTES ONLINE ── */}
      {tab==="pendientes"&&(
        <div>
          {pendingOnline.length===0&&(
            <div style={{...sx.card,padding:40,textAlign:"center"}}>
              <div style={{fontSize:40,marginBottom:10}}>✅</div>
              <div style={{color:C.green,fontWeight:700}}>Sin citas online pendientes</div>
              <div style={{color:C.muted,fontSize:13,marginTop:4}}>Todas las solicitudes han sido gestionadas</div>
            </div>
          )}
          {pendingOnline.map(apt=>{
            const svc=svcs.find(s=>s.id===apt.sid),st=staff.find(s=>s.id===apt.tid);
            return(
              <div key={apt.id} style={{...sx.card,padding:18,marginBottom:10,border:`1px solid ${C.orange}44`}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:10}}>
                  <div>
                    <div style={{color:C.cream,fontWeight:700,fontSize:15}}>{apt.clientName||"Cliente online"}</div>
                    <div style={{color:C.muted,fontSize:12,marginTop:2}}>{apt.clientPhone}
                      {apt.clientPhone&&<button style={{...sx.ghost,padding:"2px 8px",fontSize:10,marginLeft:8}} onClick={()=>openWA(`Hola ${apt.clientName}, te confirmamos tu cita de ${svc?.name} para el ${apt.date} a las ${apt.time}. ¡Te esperamos en Jimmy Expression! ✨`)}>📲 Confirmar x WA</button>}
                    </div>
                    {apt.clientEmail&&<div style={{color:C.muted,fontSize:11}}>{apt.clientEmail}</div>}
                  </div>
                  <Badge c={C.orange} sm>Online · Pendiente</Badge>
                </div>
                <div style={{...sx.card,padding:10,marginBottom:12,background:C.surface}}>
                  <div style={{color:C.cream,fontSize:13}}>{svc?.name}</div>
                  <div style={{color:C.muted,fontSize:12,marginTop:2}}>👤 {st?.name} &nbsp;📅 {apt.date} &nbsp;⏰ {apt.time}</div>
                  {svc&&<div style={{color:C.goldL,fontWeight:700,fontSize:13,marginTop:4}}>{fmt(svc.price)}</div>}
                </div>
                {apt.notes&&<div style={{color:C.muted,fontSize:12,fontStyle:"italic",marginBottom:10}}>📝 "{apt.notes}"</div>}
                <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
                  <button style={{...sx.btn,background:C.green,padding:"8px 16px",fontSize:12}}
                    onClick={()=>{setApts(p=>p.map(a=>a.id===apt.id?{...a,status:"confirmed"}:a));toast("Cita confirmada ✓");}}>
                    ✓ Confirmar
                  </button>
                  <button style={{...sx.ghost,padding:"8px 16px",fontSize:12}}
                    onClick={()=>{setApts(p=>p.map(a=>a.id===apt.id?{...a,status:"cancelled"}:a));toast("Cita rechazada","warn");}}>
                    ✗ Rechazar
                  </button>
                  <button style={{...sx.btn,background:C.green,padding:"8px 16px",fontSize:12}}
                    onClick={()=>openWA(`Hola ${apt.clientName||""}, te confirmamos tu cita:\n\n✂️ ${svc?.name}\n👤 ${st?.name}\n📅 ${apt.date} a las ${apt.time}\n\n¡Te esperamos en Jimmy Expression! ✨`)}>
                    📲 WhatsApp
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════
// MÓDULO: APERTURA Y CIERRE DE CAJA

// ══════════════════════════════════════════════════════════════════
function AperturaCierre({sales,apts,svcs,staff,caja,setCaja,toast}){
  const [tab,setTab]=useState("estado");
  const [fondoInput,setFondoInput]=useState("");
  const [efectivoFisico,setEfectivoFisico]=useState("");
  const [notasCierre,setNotasCierre]=useState("");
  const [confirmando,setConfirmando]=useState(false);

  const today=D0(0);
  const estado=caja.sesiones?.find(s=>s.fecha===today);
  const estaAbierta=estado?.abierta===true;

  // Calcular totales en vivo
  // Usa calcVenta global
  const calcTotalesVivo=()=>{
    const daySales=sales.filter(s=>s.date===today);
    let ef=0,tc=0,nq=0;
    daySales.forEach(s=>{
      const v=calcVenta(s);
      if(s.pagos&&s.pagos.length>0){
        s.pagos.forEach(pg=>{
          const pm=pg.metodo||"";
          if(pm==="efectivo") ef+=+pg.monto||0;
          else if(pm==="tarjeta") tc+=+pg.monto||0;
          else nq+=+pg.monto||0;
        });
      } else {
        const pm=s.pay||"";
        if(pm==="efectivo") ef+=v;
        else if(pm==="tarjeta") tc+=v;
        else nq+=v;
      }
    });
    const propinas=daySales.reduce((a,b)=>a+(+b.tip||0),0);
    const servicios=daySales.reduce((a,b)=>a+calcVenta(b),0);
    const totalVentas=ef+tc+nq;
    const efectivoEnCaja=(estado?.fondoInicial||0)+ef;
    const citas=apts.filter(a=>a.date===today).length;
    return{ef,tc,nq,propinas,servicios,totalVentas,efectivoEnCaja,citas,transacciones:daySales.length};
  };

  const abrirCaja=()=>{
    const fondo=Number(fondoInput)||0;
    const hora=new Date().toLocaleTimeString("es-CO",{hour:"2-digit",minute:"2-digit"});
    const nueva={
      id:uid(),fecha:today,abierta:true,
      horaApertura:hora,
      fondoInicial:fondo,
      cierreFinal:null,horaCierre:null,notas:""
    };
    setCaja(p=>({...p,sesiones:[...(p.sesiones||[]).filter(s=>s.fecha!==today),nueva]}));
    toast("✅ Caja abierta · Fondo inicial: "+fmt(fondo));
    setFondoInput("");
  };

  const cerrarCaja=()=>{
    const t=calcTotalesVivo();
    const efFisico=Number(efectivoFisico)||0;
    const diferencia=efFisico-(t.ef+(estado?.fondoInicial||0));
    const hora=new Date().toLocaleTimeString("es-CO",{hour:"2-digit",minute:"2-digit"});
    const cierre={
      totalEfectivo:t.ef,
      totalTarjeta:t.tc,
      totalNequi:t.nq,
      totalServicios:t.servicios,
      totalPropinas:t.propinas,
      total:t.totalVentas,
      efectivoEsperado:t.efectivoEnCaja,
      efectivoFisicoContado:efFisico,
      diferencia,
      transacciones:t.transacciones,
      citas:t.citas,
      horaCierre:hora,
      notas:notasCierre,
    };
    setCaja(p=>({...p,sesiones:(p.sesiones||[]).map(s=>
      s.fecha===today?{...s,abierta:false,cierreFinal:cierre,horaCierre:hora}:s
    )}));
    toast("🔒 Caja cerrada. Total: "+fmt(t.totalVentas));
    setConfirmando(false);
    setEfectivoFisico("");
    setNotasCierre("");
  };

  const imprimirCierre=()=>{
    const s=estado?.cierreFinal;if(!s)return;
    const diferColor=s.diferencia>=0?"color:green":"color:red";
    const w=window.open("","_blank","width=400,height=720");
    w.document.write(`<!DOCTYPE html><html><head><title>Cierre de Caja ${today}</title>
    <style>
      *{margin:0;padding:0;box-sizing:border-box;}
      body{font-family:'Courier New',monospace;font-size:12px;max-width:320px;margin:10px auto;padding:10px;color:#111;}
      h2{text-align:center;font-size:15px;margin-bottom:4px;}
      .sub{text-align:center;font-size:10px;color:#555;margin-bottom:2px;}
      hr{border:none;border-top:1px dashed #555;margin:7px 0;}
      table{width:100%;border-collapse:collapse;}
      td{padding:2px 0;vertical-align:top;}
      td:last-child{text-align:right;}
      .sec{font-weight:bold;font-size:11px;text-transform:uppercase;letter-spacing:1px;color:#444;margin:6px 0 3px;}
      .tot{font-weight:bold;font-size:14px;}
      .box{border:1px solid #ccc;border-radius:4px;padding:6px 8px;margin:6px 0;}
      .green{color:#2a7a2a;font-weight:bold;}
      .red{color:#c00;font-weight:bold;}
      .footer{text-align:center;font-size:10px;margin-top:10px;color:#555;line-height:1.6;}
    </style></head><body>
    <h2>JIMMY EXPRESSION</h2>
    <div class="sub">Pinar del Río Mall, El Poblado · Medellín</div>
    <div class="sub">NIT: 900.123.456-7 · jimmyexpression.com</div>
    <hr>
    <div style="text-align:center;font-weight:bold;font-size:13px;">REPORTE DE CIERRE DE CAJA</div>
    <div style="text-align:center;font-size:10px;margin-top:3px;">Fecha: ${today} &nbsp;|&nbsp; Apertura: ${estado.horaApertura} &nbsp;|&nbsp; Cierre: ${s.horaCierre}</div>
    <hr>
    <div class="sec">Apertura</div>
    <table>
      <tr><td>Fondo inicial en efectivo</td><td><b>${fmt(estado.fondoInicial)}</b></td></tr>
    </table>
    <hr>
    <div class="sec">Movimientos del día</div>
    <table>
      <tr><td>Servicios realizados</td><td>${fmt(s.totalServicios)}</td></tr>
      <tr><td>Propinas</td><td>${fmt(s.totalPropinas)}</td></tr>
      <tr><td>Transacciones</td><td>${s.transacciones}</td></tr>
      <tr><td>Citas atendidas</td><td>${s.citas||0}</td></tr>
    </table>
    <hr>
    <div class="sec">Ingresos por método de pago</div>
    <table>
      <tr><td>💵 Efectivo (ventas)</td><td>${fmt(s.totalEfectivo)}</td></tr>
      <tr><td>💳 Tarjeta</td><td>${fmt(s.totalTarjeta)}</td></tr>
      <tr><td>📱 Nequi / Transferencia</td><td>${fmt(s.totalNequi)}</td></tr>
    </table>
    <hr>
    <div class="sec">Cierre de efectivo</div>
    <div class="box">
      <table>
        <tr><td>Fondo inicial</td><td>${fmt(estado.fondoInicial)}</td></tr>
        <tr><td>+ Efectivo recibido hoy</td><td>${fmt(s.totalEfectivo)}</td></tr>
        <tr><td style="border-top:1px solid #ccc;padding-top:4px;font-weight:bold;">= Efectivo esperado en caja</td><td style="border-top:1px solid #ccc;padding-top:4px;font-weight:bold;">${fmt(s.efectivoEsperado)}</td></tr>
        <tr><td>Efectivo contado físicamente</td><td><b>${fmt(s.efectivoFisicoContado)}</b></td></tr>
        <tr><td style="font-weight:bold;">Diferencia</td><td style="${diferColor}">${s.diferencia>=0?"+":""}${fmt(s.diferencia)}</td></tr>
      </table>
    </div>
    <hr>
    <table><tr class="tot"><td>TOTAL VENTAS DEL DÍA</td><td>${fmt(s.total)}</td></tr></table>
    ${s.notas?`<hr><div class="sec">Notas</div><div style="font-size:11px;">${s.notas}</div>`:""}
    <hr>
    <div class="footer">
      Reporte generado automáticamente<br>
      Jimmy Expression · ${today}<br>
      ___________________________<br>
      Firma responsable de caja
    </div>
    </body></html>`);
    w.document.close();w.print();
  };

  const historial=(caja.sesiones||[]).filter(s=>s.cierreFinal).sort((a,b)=>b.fecha.localeCompare(a.fecha)).slice(0,15);
  const vivo=estaAbierta?calcTotalesVivo():null;

  return(
    <div>
      <div style={{display:"flex",gap:6,marginBottom:18}}>
        {["estado","historial"].map(t=>(
          <button key={t} onClick={()=>setTab(t)} style={{...(tab===t?sx.btn:sx.ghost),padding:"7px 14px",fontSize:12}}>
            {t==="estado"?"Estado de caja":"Historial"}
          </button>
        ))}
      </div>

      {tab==="estado"&&(
        <div>
          {/* ── BANNER ESTADO ── */}
          <div style={{...sx.card,padding:20,marginBottom:14,border:`2px solid ${estaAbierta?C.green:C.red}`,background:estaAbierta?C.greenD:C.redD}}>
            <div style={{display:"flex",alignItems:"center",gap:14}}>
              <div style={{fontSize:42}}>{estaAbierta?"🟢":"🔴"}</div>
              <div style={{flex:1}}>
                <div style={{color:estaAbierta?C.green:C.red,fontWeight:800,fontSize:20}}>{estaAbierta?"CAJA ABIERTA":"CAJA CERRADA"}</div>
                {estado&&estaAbierta&&(
                  <div style={{color:C.muted,fontSize:12,marginTop:4}}>
                    Apertura: <b style={{color:C.cream}}>{estado.horaApertura}</b>
                    &nbsp;·&nbsp;Fondo inicial: <b style={{color:C.gold}}>{fmt(estado.fondoInicial)}</b>
                    &nbsp;·&nbsp;Efectivo en caja ahora: <b style={{color:C.green}}>{fmt((estado.fondoInicial||0)+(vivo?.ef||0))}</b>
                  </div>
                )}
                {estado&&!estaAbierta&&!estado.cierreFinal&&(
                  <div style={{color:C.muted,fontSize:12,marginTop:4}}>No se ha abierto caja hoy</div>
                )}
                {!estado&&<div style={{color:C.muted,fontSize:12,marginTop:4}}>No se ha abierto caja hoy</div>}
              </div>
              {estaAbierta&&vivo&&(
                <div style={{textAlign:"right"}}>
                  <div style={{color:C.gold,fontWeight:800,fontSize:24}}>{fmt(vivo.totalVentas)}</div>
                  <div style={{color:C.muted,fontSize:11}}>total vendido hoy</div>
                </div>
              )}
            </div>
          </div>

          {/* ── ABRIR CAJA ── */}
          {!estaAbierta&&(
            <div style={{...sx.card,padding:20,marginBottom:14}}>
              <div style={{color:C.cream,fontWeight:700,fontSize:15,marginBottom:6}}>Abrir caja del día — {today}</div>
              <div style={{color:C.muted,fontSize:12,marginBottom:16}}>Ingresa el efectivo físico con el que inicias el turno (fondo de cambio).</div>
              <Fld lbl="Fondo inicial en efectivo (dinero de cambio)">
                <Inp type="number" value={fondoInput} onChange={e=>setFondoInput(e.target.value)}
                  placeholder="Ej: 100000" style={{marginBottom:14,fontSize:16}}/>
              </Fld>
              {fondoInput&&(
                <div style={{...sx.card,padding:12,marginBottom:14,background:C.greenD,border:`1px solid ${C.green}44`}}>
                  <div style={{color:C.green,fontSize:13}}>
                    La caja iniciará con <b>{fmt(Number(fondoInput))}</b> en efectivo físico.
                  </div>
                </div>
              )}
              <button style={{...sx.btn,background:C.green,width:"100%",padding:14,fontSize:15}}
                onClick={abrirCaja}>🟢 Abrir caja</button>
            </div>
          )}

          {/* ── CAJA ABIERTA: RESUMEN EN VIVO ── */}
          {estaAbierta&&vivo&&(
            <div>
              {/* KPIs en vivo */}
              <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(130px,1fr))",gap:10,marginBottom:14}}>
                {[
                  {l:"Fondo inicial",v:fmt(estado.fondoInicial),c:C.muted,icon:"🏦"},
                  {l:"Efectivo vendido",v:fmt(vivo.ef),c:C.green,icon:"💵"},
                  {l:"Efectivo en caja",v:fmt((estado.fondoInicial||0)+vivo.ef),c:C.goldL,icon:"💰"},
                  {l:"Tarjeta",v:fmt(vivo.tc),c:C.blue,icon:"💳"},
                  {l:"Nequi/Transfer",v:fmt(vivo.nq),c:C.purple,icon:"📱"},
                  {l:"Propinas",v:fmt(vivo.propinas),c:C.rose,icon:"🙏"},
                  {l:"Transacciones",v:vivo.transacciones,c:C.cream,icon:"🧾"},
                  {l:"Citas hoy",v:vivo.citas,c:C.cream,icon:"📅"},
                ].map(k=>(
                  <div key={k.l} style={{...sx.card,padding:"12px 14px",textAlign:"center"}}>
                    <div style={{fontSize:18,marginBottom:4}}>{k.icon}</div>
                    <div style={{color:k.c,fontWeight:800,fontSize:16}}>{k.v}</div>
                    <div style={{color:C.muted,fontSize:10,marginTop:2,textTransform:"uppercase",letterSpacing:0.8}}>{k.l}</div>
                  </div>
                ))}
              </div>

              {/* Tabla desglose */}
              <div style={{...sx.card,padding:18,marginBottom:14}}>
                <div style={{color:C.muted,fontSize:10,textTransform:"uppercase",letterSpacing:1.5,marginBottom:14}}>Desglose apertura → situación actual</div>
                <table style={{width:"100%",borderCollapse:"collapse"}}>
                  <tbody>
                    {[
                      {label:"Fondo con que se abrió la caja",value:fmt(estado.fondoInicial),color:C.muted,bold:false},
                      {label:"+ Efectivo recibido en ventas hoy",value:fmt(vivo.ef),color:C.green,bold:false},
                      {label:"= Efectivo total esperado en caja",value:fmt((estado.fondoInicial||0)+vivo.ef),color:C.goldL,bold:true},
                      {label:"Cobros por tarjeta (no en caja)",value:fmt(vivo.tc),color:C.blue,bold:false},
                      {label:"Cobros digitales Nequi/Transfer",value:fmt(vivo.nq),color:C.purple,bold:false},
                      {label:"Propinas totales",value:fmt(vivo.propinas),color:C.rose,bold:false},
                      {label:"TOTAL VENTAS DEL DÍA",value:fmt(vivo.totalVentas),color:C.gold,bold:true},
                    ].map((row,i)=>(
                      <tr key={i} style={{borderBottom:`1px solid ${C.border}22`}}>
                        <td style={{color:row.bold?C.cream:C.muted,padding:"9px 0",fontSize:13,fontWeight:row.bold?700:400}}>{row.label}</td>
                        <td style={{color:row.color,fontWeight:row.bold?800:600,fontSize:row.bold?16:13,textAlign:"right",padding:"9px 0"}}>{row.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Botón cerrar / formulario de cierre */}
              {!confirmando?(
                <button style={{...sx.btn,background:C.red,width:"100%",padding:14,fontSize:15,marginBottom:10}}
                  onClick={()=>setConfirmando(true)}>
                  🔴 Cerrar caja y generar reporte
                </button>
              ):(
                <div style={{...sx.card,padding:20,marginBottom:14,border:`1px solid ${C.red}44`}}>
                  <div style={{color:C.red,fontWeight:700,fontSize:15,marginBottom:14}}>Confirmación de cierre de caja</div>

                  <div style={{...sx.card,padding:14,marginBottom:14,background:C.surface}}>
                    <div style={{color:C.muted,fontSize:11,marginBottom:6}}>Efectivo esperado en caja</div>
                    <div style={{color:C.goldL,fontWeight:800,fontSize:22}}>{fmt((estado.fondoInicial||0)+vivo.ef)}</div>
                    <div style={{color:C.muted,fontSize:11,marginTop:4}}>= Fondo inicial ({fmt(estado.fondoInicial)}) + ventas en efectivo ({fmt(vivo.ef)})</div>
                  </div>

                  <Fld lbl="Efectivo físico contado en caja (cuenta los billetes)">
                    <Inp type="number" value={efectivoFisico} onChange={e=>setEfectivoFisico(e.target.value)}
                      placeholder={String((estado.fondoInicial||0)+vivo.ef)} style={{fontSize:16,marginBottom:10}}/>
                  </Fld>

                  {efectivoFisico&&(()=>{
                    const esperado=(estado.fondoInicial||0)+vivo.ef;
                    const contado=Number(efectivoFisico);
                    const diff=contado-esperado;
                    const ok=Math.abs(diff)<1000;
                    return(
                      <div style={{...sx.card,padding:12,marginBottom:12,background:ok?C.greenD:C.redD,border:`1px solid ${ok?C.green:C.red}44`}}>
                        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                          <div>
                            <div style={{color:C.muted,fontSize:11}}>Diferencia de caja</div>
                            <div style={{color:ok?C.green:C.red,fontWeight:800,fontSize:20}}>
                              {diff>=0?"+":""}{fmt(diff)}
                            </div>
                          </div>
                          <div style={{fontSize:28}}>{ok?"✅":"⚠️"}</div>
                        </div>
                        {!ok&&<div style={{color:C.orange,fontSize:11,marginTop:6}}>
                          Hay una diferencia mayor a $1.000. Verifica el conteo antes de cerrar.
                        </div>}
                      </div>
                    );
                  })()}

                  <Fld lbl="Notas del cierre (opcional)">
                    <Txta value={notasCierre} onChange={e=>setNotasCierre(e.target.value)}
                      placeholder="Observaciones, diferencias, incidentes..." style={{marginBottom:14,minHeight:60}}/>
                  </Fld>

                  <div style={{...sx.card,padding:12,marginBottom:14,background:C.surface}}>
                    <div style={{color:C.muted,fontSize:11,marginBottom:8,textTransform:"uppercase",letterSpacing:1}}>Resumen final del día</div>
                    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
                      {[
                        {l:"Abrió con",v:fmt(estado.fondoInicial),c:C.muted},
                        {l:"Cierra con (efectivo esperado)",v:fmt((estado.fondoInicial||0)+vivo.ef),c:C.goldL},
                        {l:"Total vendido hoy",v:fmt(vivo.totalVentas),c:C.gold},
                        {l:"Servicios",v:fmt(vivo.servicios),c:C.green},
                        {l:"Propinas",v:fmt(vivo.propinas),c:C.rose},
                        {l:"Transacciones",v:vivo.transacciones,c:C.cream},
                      ].map(k=>(
                        <div key={k.l} style={{background:C.bg,borderRadius:6,padding:"8px 10px"}}>
                          <div style={{color:C.muted,fontSize:10,textTransform:"uppercase",letterSpacing:0.8}}>{k.l}</div>
                          <div style={{color:k.c,fontWeight:700,fontSize:14,marginTop:2}}>{k.v}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div style={{display:"flex",gap:8}}>
                    <button style={{...sx.btn,background:C.red,flex:1,padding:12,fontSize:14}} onClick={cerrarCaja}>
                      🔒 Confirmar cierre
                    </button>
                    <button style={{...sx.ghost,padding:12,fontSize:13}} onClick={()=>{setConfirmando(false);setEfectivoFisico("");setNotasCierre("");}}>
                      Cancelar
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ── REPORTE DEL ÚLTIMO CIERRE ── */}
          {estado?.cierreFinal&&(
            <div style={{...sx.card,padding:20,border:`1px solid ${C.gold}44`,marginTop:14}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
                <div>
                  <div style={{color:C.cream,fontWeight:700,fontSize:15}}>Reporte de cierre — {today}</div>
                  <div style={{color:C.muted,fontSize:11,marginTop:2}}>Apertura {estado.horaApertura} → Cierre {estado.cierreFinal.horaCierre}</div>
                </div>
                <button style={{...sx.btn,padding:"7px 16px",fontSize:12}} onClick={imprimirCierre}>🖨 Imprimir reporte</button>
              </div>

              {/* Fondo inicial vs fondo final */}
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:14}}>
                <div style={{...sx.card,padding:16,background:C.surface,border:`1px solid ${C.border}`,textAlign:"center"}}>
                  <div style={{color:C.muted,fontSize:10,textTransform:"uppercase",letterSpacing:1,marginBottom:6}}>🏦 Abrió con</div>
                  <div style={{color:C.cream,fontWeight:800,fontSize:22}}>{fmt(estado.fondoInicial)}</div>
                  <div style={{color:C.muted,fontSize:11,marginTop:4}}>Hora: {estado.horaApertura}</div>
                </div>
                <div style={{...sx.card,padding:16,background:C.surface,border:`1px solid ${C.goldL}44`,textAlign:"center"}}>
                  <div style={{color:C.muted,fontSize:10,textTransform:"uppercase",letterSpacing:1,marginBottom:6}}>💰 Cerró con (efectivo)</div>
                  <div style={{color:C.goldL,fontWeight:800,fontSize:22}}>{fmt(estado.cierreFinal.efectivoEsperado)}</div>
                  <div style={{color:C.muted,fontSize:11,marginTop:4}}>Hora: {estado.cierreFinal.horaCierre}</div>
                </div>
              </div>

              {/* Diferencia */}
              {estado.cierreFinal.efectivoFisicoContado>0&&(()=>{
                const diff=estado.cierreFinal.diferencia;
                const ok=Math.abs(diff)<1000;
                return(
                  <div style={{...sx.card,padding:12,marginBottom:14,background:ok?C.greenD:C.redD,border:`1px solid ${ok?C.green:C.red}44`}}>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                      <div>
                        <div style={{color:C.muted,fontSize:11}}>Efectivo contado vs esperado</div>
                        <div style={{color:ok?C.green:C.red,fontWeight:800,fontSize:18}}>
                          {diff>=0?"+":""}{fmt(diff)} {ok?"✅":"⚠️"}
                        </div>
                      </div>
                      <div style={{textAlign:"right"}}>
                        <div style={{color:C.muted,fontSize:11}}>Contado físicamente</div>
                        <div style={{color:C.cream,fontWeight:700,fontSize:16}}>{fmt(estado.cierreFinal.efectivoFisicoContado)}</div>
                      </div>
                    </div>
                  </div>
                );
              })()}

              {/* Desglose completo */}
              <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(120px,1fr))",gap:10}}>
                {[
                  {l:"Total ventas",v:fmt(estado.cierreFinal.total),c:C.gold},
                  {l:"Efectivo",v:fmt(estado.cierreFinal.totalEfectivo),c:C.green},
                  {l:"Tarjeta",v:fmt(estado.cierreFinal.totalTarjeta),c:C.blue},
                  {l:"Nequi/Transfer",v:fmt(estado.cierreFinal.totalNequi),c:C.purple},
                  {l:"Propinas",v:fmt(estado.cierreFinal.totalPropinas),c:C.rose},
                  {l:"Transacciones",v:estado.cierreFinal.transacciones,c:C.cream},
                ].map(k=>(
                  <div key={k.l} style={{background:C.surface,borderRadius:8,padding:"10px 12px"}}>
                    <div style={{color:k.c,fontWeight:800,fontSize:15}}>{k.v}</div>
                    <div style={{color:C.muted,fontSize:10,marginTop:2,textTransform:"uppercase",letterSpacing:0.8}}>{k.l}</div>
                  </div>
                ))}
              </div>
              {estado.cierreFinal.notas&&(
                <div style={{color:C.muted,fontSize:12,marginTop:12,fontStyle:"italic",padding:"8px 0",borderTop:`1px solid ${C.border}`}}>
                  📝 {estado.cierreFinal.notas}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {tab==="historial"&&(
        <div>
          {historial.length===0&&<div style={{color:C.muted,textAlign:"center",padding:40}}>Sin historial de cierres</div>}
          {historial.map(ses=>{const s=ses.cierreFinal;const diff=s.diferencia||0;return(
            <div key={ses.id} style={{...sx.card,padding:18,marginBottom:10}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:12}}>
                <div>
                  <div style={{color:C.cream,fontWeight:700,fontSize:14}}>{ses.fecha}</div>
                  <div style={{color:C.muted,fontSize:11,marginTop:2}}>
                    Apertura {ses.horaApertura} → Cierre {ses.horaCierre} · {s.transacciones} transacciones
                  </div>
                </div>
                <div style={{textAlign:"right"}}>
                  <div style={{color:C.gold,fontWeight:800,fontSize:18}}>{fmt(s.total)}</div>
                  <div style={{color:C.muted,fontSize:11}}>total ventas</div>
                </div>
              </div>

              {/* Fondo inicio vs fondo fin */}
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8,marginBottom:10}}>
                <div style={{background:C.surface,borderRadius:6,padding:"8px 10px"}}>
                  <div style={{color:C.muted,fontSize:10,textTransform:"uppercase"}}>Abrió con</div>
                  <div style={{color:C.cream,fontWeight:700,fontSize:13,marginTop:2}}>{fmt(ses.fondoInicial)}</div>
                </div>
                <div style={{background:C.surface,borderRadius:6,padding:"8px 10px"}}>
                  <div style={{color:C.muted,fontSize:10,textTransform:"uppercase"}}>Cerró con</div>
                  <div style={{color:C.goldL,fontWeight:700,fontSize:13,marginTop:2}}>{fmt(s.efectivoEsperado)}</div>
                </div>
                <div style={{background:Math.abs(diff)<1000?C.greenD:C.redD,borderRadius:6,padding:"8px 10px",border:`1px solid ${Math.abs(diff)<1000?C.green:C.red}33`}}>
                  <div style={{color:C.muted,fontSize:10,textTransform:"uppercase"}}>Diferencia</div>
                  <div style={{color:Math.abs(diff)<1000?C.green:C.red,fontWeight:700,fontSize:13,marginTop:2}}>{diff>=0?"+":""}{fmt(diff)}</div>
                </div>
              </div>

              <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
                {[{l:"Efectivo",v:s.totalEfectivo,c:C.green},{l:"Tarjeta",v:s.totalTarjeta,c:C.blue},{l:"Nequi",v:s.totalNequi,c:C.purple},{l:"Propinas",v:s.totalPropinas,c:C.rose}].map(k=>(
                  <div key={k.l} style={{background:C.surface,borderRadius:6,padding:"5px 10px"}}>
                    <span style={{color:k.c,fontWeight:700,fontSize:12}}>{fmt(k.v)}</span>
                    <span style={{color:C.muted,fontSize:10,marginLeft:4}}>{k.l}</span>
                  </div>
                ))}
              </div>
              {s.notas&&<div style={{color:C.muted,fontSize:11,marginTop:8,fontStyle:"italic"}}>📝 {s.notas}</div>}
            </div>
          );})}
        </div>
      )}
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════
// MÓDULO: TICKETS Y FACTURAS
// ══════════════════════════════════════════════════════════════════
// ══════════════════════════════════════════════════════════════════
// HELPERS: GENERACIÓN HTML DE TICKET Y FACTURA (reutilizables)
// ══════════════════════════════════════════════════════════════════

function generarHTMLTicket(venta, cliente, servicio, estilista, empresa) {
  const total = venta.amount * (1 - (venta.disc||0)/100) + (venta.tip||0);
  const logoHTML = empresa?.logoUrl
    ? `<img src="${empresa.logoUrl}" style="max-width:120px;max-height:60px;object-fit:contain;margin-bottom:6px;" alt="Logo"/>`
    : `<div style="font-size:28px;margin-bottom:4px;">${empresa?.logoEmoji||"✂️"}</div>`;
  return `<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Tiquete</title>
  <style>
    *{margin:0;padding:0;box-sizing:border-box;}
    body{font-family:'Courier New',monospace;font-size:12px;max-width:300px;margin:0 auto;padding:12px;color:#111;}
    .center{text-align:center;} .bold{font-weight:bold;} .big{font-size:15px;}
    hr{border:none;border-top:1px dashed #555;margin:8px 0;}
    table{width:100%;border-collapse:collapse;}
    td{padding:2px 0;vertical-align:top;} td:last-child{text-align:right;}
    .total-row{font-weight:bold;font-size:14px;border-top:1px dashed #555;padding-top:5px;}
    .footer{text-align:center;font-size:10px;margin-top:10px;line-height:1.7;color:#444;}
  </style></head><body>
  <div class="center">${logoHTML}</div>
  <div class="center bold big">${empresa?.nombre||"JIMMY EXPRESSION"}</div>
  <div class="center" style="font-size:10px;margin-top:3px;">${empresa?.direccion||"Pinar del Río Mall, El Poblado"}<br>${empresa?.ciudad||"Medellín, Colombia"}<br>NIT: ${empresa?.nit||"900.123.456-7"}<br>Tel: ${empresa?.telefono||"+57 316 447 4596"}</div>
  <hr>
  <div class="center bold">TIQUETE DE VENTA</div>
  <div class="center" style="font-size:10px;">No. ${venta.id?.slice(-6)||"000001"} &nbsp;|&nbsp; ${venta.date||new Date().toLocaleDateString("es-CO")} &nbsp;${new Date().toLocaleTimeString("es-CO",{hour:"2-digit",minute:"2-digit"})}</div>
  <hr>
  <table>
    <tr><td>Cliente:</td><td><b>${cliente?.name||"Consumidor final"}</b></td></tr>
    <tr><td>Estilista:</td><td>${estilista?.name||"—"}</td></tr>
  </table>
  <hr>
  <table>
    <tr><td colspan="2"><b>${servicio?.name||venta.notes||"Servicio"}</b></td></tr>
    <tr><td>Valor</td><td>${fmt(venta.amount)}</td></tr>
    ${venta.disc>0?`<tr><td>Descuento ${venta.disc}%</td><td>-${fmt(venta.amount*venta.disc/100)}</td></tr>`:""}
    ${venta.tip>0?`<tr><td>Propina</td><td>${fmt(venta.tip)}</td></tr>`:""}
  </table>
  <hr>
  <table><tr class="total-row"><td>TOTAL</td><td>${fmt(total)}</td></tr>
  <tr><td style="font-size:10px;">Método de pago</td><td style="font-size:10px;">${(venta.pay||"efectivo").toUpperCase()}</td></tr></table>
  <hr>
  <div class="footer">
    ${empresa?.mensajeTiquete||"¡Gracias por tu visita!"}<br>
    ${empresa?.web||"jimmyexpression.com"}<br>
    @${empresa?.instagram||"jimmyexpression"}<br>
    <br><span style="font-size:9px;">Este tiquete no equivale a factura fiscal.</span>
  </div>
  </body></html>`;
}

function generarHTMLFactura(venta, cliente, servicio, estilista, empresa, numFactura) {
  const subtotal = venta.amount;
  const descuento = venta.amount*(venta.disc||0)/100;
  const baseIva = subtotal - descuento;
  const iva = empresa?.ivaServicios==="19" ? baseIva*0.19 : empresa?.ivaServicios==="5" ? baseIva*0.05 : 0;
  const total = baseIva + iva + (venta.tip||0);
  const logoHTML = empresa?.logoUrl
    ? `<img src="${empresa.logoUrl}" style="max-height:60px;max-width:160px;object-fit:contain;margin-bottom:6px;" alt="Logo"/>`
    : `<span style="font-size:36px;">${empresa?.logoEmoji||"✂️"}</span>`;
  return `<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Factura ${numFactura}</title>
  <style>
    *{box-sizing:border-box;} body{font-family:Arial,sans-serif;font-size:13px;margin:30px;color:#1a1a1a;}
    .header{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:24px;}
    .nombre{font-size:20px;font-weight:900;color:#C9A84C;letter-spacing:1px;margin-top:4px;}
    .fact-box{background:#f8f0e0;border:2px solid #C9A84C;border-radius:8px;padding:12px 18px;text-align:right;min-width:180px;}
    .fact-num{font-size:20px;font-weight:900;color:#C9A84C;}
    .grid2{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:20px;}
    .box{background:#f9f9f9;border:1px solid #eee;border-radius:6px;padding:12px;}
    .box h4{margin:0 0 6px;font-size:10px;text-transform:uppercase;letter-spacing:1px;color:#888;}
    table{width:100%;border-collapse:collapse;margin-bottom:14px;}
    th{background:#1a1a1a;color:#fff;padding:9px 12px;text-align:left;font-size:11px;}
    td{padding:9px 12px;border-bottom:1px solid #eee;font-size:12px;}
    .tots{margin-left:auto;width:280px;border-collapse:collapse;}
    .tots td{padding:7px 12px;border-bottom:1px solid #eee;}
    .tots td:last-child{text-align:right;font-weight:600;}
    .tot-final{background:#C9A84C;color:#fff;font-size:15px;font-weight:900;}
    .tot-final td{padding:11px 12px;}
    .footer{border-top:2px solid #eee;margin-top:20px;padding-top:12px;text-align:center;color:#888;font-size:10px;line-height:1.7;}
    .sello{display:inline-block;border:2px solid #4CAF82;border-radius:5px;padding:3px 12px;color:#4CAF82;font-weight:700;font-size:11px;margin-top:6px;}
    @media print{body{margin:15px;}}
  </style></head><body>
  <div class="header">
    <div>
      ${logoHTML}
      <div class="nombre">${empresa?.nombre||"JIMMY EXPRESSION"}</div>
      <div style="font-size:11px;color:#666;margin-top:4px;line-height:1.7;">
        ${empresa?.razonSocial||"Jimmy Rivera S.A.S."}<br>
        NIT: ${empresa?.nit||"900.123.456-7"}<br>
        ${empresa?.direccion||"Pinar del Río Mall, El Poblado"}<br>
        ${empresa?.ciudad||"Medellín, Antioquia"}<br>
        Tel: ${empresa?.telefono||"+57 316 447 4596"}<br>
        ${empresa?.email||"ventas@jimmyexpression.com"}
      </div>
    </div>
    <div class="fact-box">
      <div style="font-size:10px;color:#888;margin-bottom:3px;">FACTURA DE VENTA</div>
      <div class="fact-num">${numFactura}</div>
      <div style="font-size:10px;color:#666;margin-top:4px;">
        Fecha: ${venta.date||new Date().toLocaleDateString("es-CO")}<br>
        ${empresa?.resolucionDian?`Res. DIAN: ${empresa.resolucionDian}`:""}
      </div>
    </div>
  </div>
  <div class="grid2">
    <div class="box"><h4>Cliente</h4>
      <div><b>${cliente?.name||"Consumidor Final"}</b></div>
      <div style="color:#666;font-size:11px;margin-top:3px;">${cliente?.email||""}<br>${cliente?.phone||""}</div>
    </div>
    <div class="box"><h4>Pago</h4>
      <div>Método: <b>${(venta.pay||"efectivo").toUpperCase()}</b></div>
      <div style="margin-top:3px;">Estilista: <b>${estilista?.name||"—"}</b></div>
      <div style="margin-top:3px;font-size:11px;color:#888;">${new Date().toLocaleTimeString("es-CO",{hour:"2-digit",minute:"2-digit"})}</div>
    </div>
  </div>
  <table>
    <thead><tr><th>#</th><th>Descripción</th><th style="text-align:right">Unitario</th><th style="text-align:right">Total</th></tr></thead>
    <tbody>
      <tr><td>1</td><td>${servicio?.name||venta.notes||"Servicio de peluquería"}<br><span style="font-size:10px;color:#888;">Duración: ${servicio?.duration||60} min</span></td><td style="text-align:right">${fmt(subtotal)}</td><td style="text-align:right">${fmt(subtotal)}</td></tr>
      ${venta.tip>0?`<tr><td>2</td><td>Propina al estilista</td><td style="text-align:right">${fmt(venta.tip)}</td><td style="text-align:right">${fmt(venta.tip)}</td></tr>`:""}
    </tbody>
  </table>
  <table class="tots">
    <tr><td>Subtotal:</td><td>${fmt(subtotal)}</td></tr>
    ${venta.disc>0?`<tr><td>Descuento (${venta.disc}%):</td><td>-${fmt(descuento)}</td></tr>`:""}
    <tr><td>Base gravable:</td><td>${fmt(baseIva)}</td></tr>
    ${iva>0?`<tr><td>IVA (${empresa?.ivaServicios}%):</td><td>${fmt(iva)}</td></tr>`:`<tr><td style="color:#888;font-size:11px;">Sin IVA (Régimen Simplificado)</td><td>$0</td></tr>`}
    ${venta.tip>0?`<tr><td>Propina:</td><td>${fmt(venta.tip)}</td></tr>`:""}
    <tr class="tot-final"><td>TOTAL A PAGAR:</td><td>${fmt(total)}</td></tr>
  </table>
  <div class="footer">
    ${empresa?.web||"jimmyexpression.com"} &nbsp;·&nbsp; @${empresa?.instagram||"jimmyexpression"}
    <br><div class="sello">✓ PAGADO</div>
    <br><span style="font-size:9px;">Documento equivalente. ${empresa?.regimen==="comun"?"Responsable de IVA":"Régimen Simplificado"}. Conserve para reclamaciones.</span>
  </div>
  </body></html>`;
}

// ── MODAL: ENVIAR BAUCHER (WA / Email / Imprimir) ─────────────────
function ModalEnvio({venta,cliente,servicio,estilista,empresa,tipo,numFactura,onClose}){
  const [dest,setDest]=useState(""); // a dónde enviar
  const [metodo,setMetodo]=useState("whatsapp");
  const [waNum,setWaNum]=useState(cliente?.phone?.replace(/\D/g,"")||"");
  const [email,setEmail]=useState(cliente?.email||"");
  const [enviado,setEnviado]=useState(false);

  const htmlContent = tipo==="ticket"
    ? generarHTMLTicket(venta,cliente,servicio,estilista,empresa)
    : generarHTMLFactura(venta,cliente,servicio,estilista,empresa,numFactura);

  const total = tipo==="ticket"
    ? venta.amount*(1-(venta.disc||0)/100)+(venta.tip||0)
    : venta.amount*(1-(venta.disc||0)/100)+(venta.tip||0);

  const imprimir = () => {
    const w = window.open("","_blank","width=420,height=700");
    w.document.write(htmlContent);
    w.document.close();
    w.print();
    setEnviado(true);
  };

  const enviarWhatsApp = () => {
    if(!waNum){return;}
    const num = waNum.replace(/\D/g,"");
    const resumen = tipo==="ticket"
      ? `🧾 *TIQUETE DE VENTA - ${empresa?.nombre||"Jimmy Expression"}*\n\n` +
        `👤 Cliente: ${cliente?.name||"—"}\n` +
        `✂️ Servicio: ${servicio?.name||"—"}\n` +
        `💵 Total: ${fmt(total)}\n` +
        `💳 Pago: ${(venta.pay||"efectivo").toUpperCase()}\n` +
        `📅 Fecha: ${venta.date||new Date().toLocaleDateString("es-CO")}\n\n` +
        `¡Gracias por visitarnos! 💛\n${empresa?.web||"jimmyexpression.com"}`
      : `📄 *FACTURA ${numFactura} - ${empresa?.nombre||"Jimmy Expression"}*\n\n` +
        `👤 Cliente: ${cliente?.name||"—"}\n` +
        `✂️ Servicio: ${servicio?.name||"—"}\n` +
        `💵 Total: ${fmt(total)}\n` +
        `💳 Pago: ${(venta.pay||"efectivo").toUpperCase()}\n` +
        `📅 Fecha: ${venta.date||new Date().toLocaleDateString("es-CO")}\n\n` +
        `Conserva esta factura. ${empresa?.web||"jimmyexpression.com"}`;
    window.open(`https://wa.me/${num}?text=${encodeURIComponent(resumen)}`, "_blank");
    setDest(`WhatsApp +${num}`);
    setEnviado(true);
  };

  const enviarEmail = () => {
    if(!email){return;}
    const asunto = tipo==="ticket"
      ? `Tu tiquete de ${empresa?.nombre||"Jimmy Expression"}`
      : `Factura ${numFactura} - ${empresa?.nombre||"Jimmy Expression"}`;
    const cuerpo = tipo==="ticket"
      ? `Hola ${cliente?.name||""},%0A%0AGracias por tu visita en ${empresa?.nombre||"Jimmy Expression"}.%0A%0AServicio: ${servicio?.name||"—"}%0ATotal: ${fmt(total)}%0AMétodo: ${(venta.pay||"efectivo").toUpperCase()}%0AFecha: ${venta.date||""}%0A%0A¡Hasta la próxima! ✨%0A${empresa?.web||"jimmyexpression.com"}`
      : `Hola ${cliente?.name||""},%0A%0AAdjuntamos tu factura ${numFactura}.%0A%0AServicio: ${servicio?.name||"—"}%0ATotal: ${fmt(total)}%0AFecha: ${venta.date||""}%0A%0AGracias por confiar en ${empresa?.nombre||"Jimmy Expression"}.%0A${empresa?.web||"jimmyexpression.com"}`;
    window.open(`mailto:${email}?subject=${asunto}&body=${cuerpo}`, "_blank");
    setDest(`Email: ${email}`);
    setEnviado(true);
  };

  return(
    <Modal title={tipo==="ticket"?"Enviar / Imprimir Tiquete":"Enviar / Imprimir Factura"} onClose={onClose} w={480}>
      {/* Preview del documento */}
      <div style={{...sx.card,padding:14,marginBottom:18,background:C.surface,border:`1px solid ${C.gold}44`}}>
        <div style={{color:C.gold,fontWeight:700,fontSize:13,marginBottom:8}}>
          {tipo==="ticket"?"🧾 Tiquete de venta":"📄 Factura"} — Vista previa
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,fontSize:12}}>
          <div><span style={{color:C.muted}}>Cliente:</span> <span style={{color:C.cream}}>{cliente?.name||"Consumidor final"}</span></div>
          <div><span style={{color:C.muted}}>Total:</span> <span style={{color:C.goldL,fontWeight:700}}>{fmt(total)}</span></div>
          <div><span style={{color:C.muted}}>Servicio:</span> <span style={{color:C.cream}}>{servicio?.name||"—"}</span></div>
          <div><span style={{color:C.muted}}>Método:</span> <span style={{color:C.cream}}>{(venta.pay||"efectivo").toUpperCase()}</span></div>
          {tipo==="factura"&&numFactura&&<div style={{gridColumn:"1/-1"}}><span style={{color:C.muted}}>N° factura:</span> <span style={{color:C.goldL,fontWeight:700}}>{numFactura}</span></div>}
          {empresa?.logoEmoji&&<div style={{gridColumn:"1/-1"}}><span style={{color:C.muted}}>Logo:</span> <span style={{fontSize:18}}>{empresa.logoEmoji}</span> {empresa?.nombre}</div>}
        </div>
      </div>

      {/* Opción de destino */}
      <div style={{color:C.muted,fontSize:10,textTransform:"uppercase",letterSpacing:1.2,marginBottom:10}}>¿A dónde enviar?</div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8,marginBottom:18}}>
        {[
          {id:"imprimir",icon:"🖨️",label:"Imprimir"},
          {id:"whatsapp",icon:"📲",label:"WhatsApp"},
          {id:"email",icon:"📧",label:"Email"},
        ].map(m=>(
          <div key={m.id} onClick={()=>setMetodo(m.id)}
            style={{...sx.card,padding:"14px 10px",textAlign:"center",cursor:"pointer",
              border:`2px solid ${metodo===m.id?C.gold:C.border}`,
              background:metodo===m.id?C.goldD:C.card,transition:"all .15s"}}>
            <div style={{fontSize:24,marginBottom:4}}>{m.icon}</div>
            <div style={{color:metodo===m.id?C.gold:C.cream,fontWeight:metodo===m.id?700:400,fontSize:12}}>{m.label}</div>
          </div>
        ))}
      </div>

      {/* Campos según método */}
      {metodo==="whatsapp"&&(
        <div style={{marginBottom:14}}>
          <Fld lbl="Número WhatsApp (con código de país)">
            <div style={{display:"flex",gap:8}}>
              <Inp value={waNum} onChange={e=>setWaNum(e.target.value.replace(/\D/g,""))}
                placeholder="573164474596" style={{flex:1}}/>
              {cliente?.phone&&<button style={{...sx.ghost,padding:"9px 12px",fontSize:11,flexShrink:0,whiteSpace:"nowrap"}}
                onClick={()=>setWaNum(cliente.phone.replace(/\D/g,""))}>
                Usar cliente
              </button>}
            </div>
          </Fld>
          <div style={{color:C.muted,fontSize:11,marginTop:6}}>
            Se abrirá WhatsApp con el resumen del {tipo==="ticket"?"tiquete":"factura"} en el mensaje.
          </div>
        </div>
      )}
      {metodo==="email"&&(
        <div style={{marginBottom:14}}>
          <Fld lbl="Dirección de email">
            <div style={{display:"flex",gap:8}}>
              <Inp value={email} onChange={e=>setEmail(e.target.value)} type="email"
                placeholder="cliente@email.com" style={{flex:1}}/>
              {cliente?.email&&<button style={{...sx.ghost,padding:"9px 12px",fontSize:11,flexShrink:0,whiteSpace:"nowrap"}}
                onClick={()=>setEmail(cliente.email)}>
                Usar cliente
              </button>}
            </div>
          </Fld>
          <div style={{color:C.muted,fontSize:11,marginTop:6}}>
            Se abrirá tu cliente de email con el resumen del {tipo==="ticket"?"tiquete":"factura"} prellenado.
          </div>
        </div>
      )}
      {metodo==="imprimir"&&(
        <div style={{...sx.card,padding:12,marginBottom:14,background:C.blueD,border:`1px solid ${C.blue}44`}}>
          <div style={{color:C.blue,fontSize:13}}>
            🖨️ Se abrirá una ventana de impresión con el {tipo==="ticket"?"tiquete":"factura"} listo para imprimir. El logo del negocio aparecerá si está configurado en ⚙ Configuración → Empresa.
          </div>
        </div>
      )}

      {/* Botón acción */}
      <button style={{
        ...sx.btn,width:"100%",padding:13,fontSize:14,marginBottom:10,
        background:metodo==="whatsapp"?C.green:metodo==="email"?C.blue:C.gold
      }} onClick={metodo==="imprimir"?imprimir:metodo==="whatsapp"?enviarWhatsApp:enviarEmail}>
        {metodo==="imprimir"?"🖨️ Imprimir ahora":metodo==="whatsapp"?"📲 Enviar por WhatsApp":"📧 Enviar por Email"}
      </button>

      {/* Confirmación de envío */}
      {enviado&&dest&&(
        <div style={{...sx.card,padding:12,background:C.greenD,border:`1px solid ${C.green}44`,textAlign:"center"}}>
          <div style={{color:C.green,fontWeight:700,fontSize:13}}>
            ✅ {tipo==="ticket"?"Tiquete":"Factura"} enviado a {dest}
          </div>
        </div>
      )}
      {enviado&&metodo==="imprimir"&&(
        <div style={{...sx.card,padding:12,background:C.greenD,border:`1px solid ${C.green}44`,textAlign:"center"}}>
          <div style={{color:C.green,fontWeight:700,fontSize:13}}>✅ Enviado a impresora</div>
        </div>
      )}

      <button style={{...sx.ghost,width:"100%",marginTop:8}} onClick={onClose}>Cerrar</button>
    </Modal>
  );
}


// ══════════════════════════════════════════════════════════════════
// GOOGLE CALENDAR — Helper de integración
// ══════════════════════════════════════════════════════════════════

// Genera URL para crear evento en Google Calendar (sin API key, método público)
function crearEventoGoogleCalendar(apt, cliente, servicio, empresa) {
  const [h, m] = apt.time.split(":").map(Number);
  const dur = servicio?.duration || 60;
  const startDate = apt.date.replace(/-/g, "");
  const startTime = `${String(h).padStart(2,"0")}${String(m).padStart(2,"0")}00`;
  const endD = new Date(`${apt.date}T${apt.time}:00`);
  endD.setMinutes(endD.getMinutes() + dur);
  const endDate = endD.toISOString().slice(0,10).replace(/-/g,"");
  const endTime = `${String(endD.getHours()).padStart(2,"0")}${String(endD.getMinutes()).padStart(2,"0")}00`;
  const title = encodeURIComponent(`${servicio?.name||"Cita"} — ${cliente?.name||"Cliente"}`);
  const details = encodeURIComponent(
    `Servicio: ${servicio?.name||"—"}\nCliente: ${cliente?.name||"—"}\nTeléfono: ${cliente?.phone||"—"}\nPrecio: ${fmt(servicio?.price||0)}\n\n${apt.notes||""}\n\nAgendado en ${empresa?.nombre||"Jimmy Expression"}`
  );
  const location = encodeURIComponent(empresa?.direccion||"Pinar del Río Mall, El Poblado, Medellín");
  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startDate}T${startTime}/${endDate}T${endTime}&details=${details}&location=${location}`;
}

// ── BOTÓN GOOGLE CALENDAR en tarjeta de cita ─────────────────────
function BtnGoogleCal({apt, clients, svcs, empresa}) {
  const cli = clients?.find(c=>c.id===apt.cid);
  const svc = svcs?.find(s=>s.id===apt.sid);
  const url = crearEventoGoogleCalendar(apt, cli, svc, empresa);
  return(
    <button title="Agregar a Google Calendar"
      onClick={e=>{e.stopPropagation();window.open(url,"_blank");}}
      style={{background:"transparent",border:`1px solid ${C.border}`,borderRadius:5,
        color:C.muted,padding:"3px 8px",fontSize:11,cursor:"pointer",
        display:"flex",alignItems:"center",gap:4}}>
      <span style={{fontSize:12}}>📅</span> GCal
    </button>
  );
}

// ══════════════════════════════════════════════════════════════════
// SECCIÓN: LOGO EMPRESA EN CONFIGURACIÓN
// ══════════════════════════════════════════════════════════════════

// Actualización de la función Configuracion con pestaña empresa mejorada
// (logo upload + preview)

function ConfigLogoUploader({empresa, setEmpresa}) {
  const [previewUrl, setPreviewUrl] = useState(empresa?.logoUrl||"");
  const fileRef = useRef(null);

  const handleFile = (e) => {
    const file = e.target.files[0];
    if(!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const url = ev.target.result;
      setPreviewUrl(url);
      setEmpresa(p=>({...p, logoUrl: url}));
    };
    reader.readAsDataURL(file);
  };

  const clearLogo = () => {
    setPreviewUrl("");
    setEmpresa(p=>({...p, logoUrl: ""}));
    if(fileRef.current) fileRef.current.value = "";
  };

  return(
    <div style={{marginBottom:16}}>
      <label style={sx.lbl}>Logo de la empresa (aparecerá en tiquetes y facturas)</label>
      <div style={{display:"flex",gap:14,alignItems:"flex-start",flexWrap:"wrap"}}>
        {/* Preview */}
        <div style={{width:120,height:80,borderRadius:10,border:`2px dashed ${C.border}`,
          display:"flex",alignItems:"center",justifyContent:"center",
          background:C.surface,overflow:"hidden",flexShrink:0}}>
          {previewUrl
            ? <img src={previewUrl} style={{maxWidth:"100%",maxHeight:"100%",objectFit:"contain"}} alt="Logo"/>
            : <span style={{fontSize:32}}>{empresa?.logoEmoji||"✂️"}</span>
          }
        </div>
        <div style={{flex:1}}>
          <div style={{display:"flex",gap:8,marginBottom:8}}>
            <button style={{...sx.btn,padding:"8px 14px",fontSize:12}}
              onClick={()=>fileRef.current?.click()}>
              📁 Subir logo
            </button>
            {previewUrl&&<button style={{...sx.ghost,padding:"8px 14px",fontSize:12}} onClick={clearLogo}>
              Quitar logo
            </button>}
          </div>
          <input ref={fileRef} type="file" accept="image/*" style={{display:"none"}} onChange={handleFile}/>
          <div style={{color:C.muted,fontSize:11,lineHeight:1.6}}>
            Formatos: PNG, JPG, SVG. Recomendado: fondo transparente (PNG).<br/>
            Aparecerá en tiquetes, facturas y formulario de reservas.
          </div>
          {previewUrl&&(
            <div style={{color:C.green,fontSize:11,marginTop:4}}>✓ Logo cargado correctamente</div>
          )}
        </div>
      </div>
    </div>
  );
}


// ══════════════════════════════════════════════════════════════════
// MÓDULO: CONFIGURACIÓN (empresa + preferencias)
// ══════════════════════════════════════════════════════════════════
// ══════════════════════════════════════════════════════════════════
function Configuracion({empresa,setEmpresa,toast}){
  const [tab,setTab]=useState("empresa");
  const [f,setF]=useState({...empresa});
  const set=(k,v)=>setF(p=>({...p,[k]:v}));
  const save=()=>{setEmpresa({...f});toast("✅ Configuración guardada");};

  return(
    <div>
      <div style={{display:"flex",gap:6,marginBottom:18,flexWrap:"wrap"}}>
        {[
          {id:"empresa",label:"🏢 Empresa"},
          {id:"facturacion",label:"🧾 Facturación"},
          {id:"apariencia",label:"🎨 Apariencia"},
          {id:"integraciones",label:"🔗 Integraciones"},
          {id:"cuenta",label:"👤 Cuenta"},
        ].map(t=>(
          <button key={t.id} onClick={()=>setTab(t.id)} style={{...(tab===t.id?sx.btn:sx.ghost),padding:"7px 14px",fontSize:12}}>
            {t.label}
          </button>
        ))}
      </div>

      {tab==="empresa"&&(
        <div style={{...sx.card,padding:24}}>
          <div style={{color:C.cream,fontWeight:700,fontSize:16,marginBottom:18}}>Datos de la empresa</div>
          <ConfigLogoUploader empresa={f} setEmpresa={setF}/>
        <Row><Fld lbl="Nombre comercial"><Inp value={f.nombre||""} onChange={e=>set("nombre",e.target.value)} placeholder="Jimmy Expression"/></Fld><Fld lbl="Razón social"><Inp value={f.razonSocial||""} onChange={e=>set("razonSocial",e.target.value)} placeholder="Jimmy Rivera S.A.S."/></Fld></Row>
          <Row><Fld lbl="NIT / RUT"><Inp value={f.nit||""} onChange={e=>set("nit",e.target.value)} placeholder="900.123.456-7"/></Fld><Fld lbl="Régimen fiscal"><Sel value={f.regimen||"simplificado"} onChange={e=>set("regimen",e.target.value)}><option value="simplificado">Régimen Simplificado</option><option value="comun">Responsable de IVA</option><option value="especial">Régimen Especial</option></Sel></Fld></Row>
          <Row><Fld lbl="Dirección"><Inp value={f.direccion||""} onChange={e=>set("direccion",e.target.value)} placeholder="Pinar del Río Mall, El Poblado"/></Fld><Fld lbl="Ciudad"><Inp value={f.ciudad||""} onChange={e=>set("ciudad",e.target.value)} placeholder="Medellín, Antioquia"/></Fld></Row>
          <Row><Fld lbl="Teléfono"><Inp value={f.telefono||""} onChange={e=>set("telefono",e.target.value)} placeholder="+57 316 447 4596"/></Fld><Fld lbl="Email"><Inp value={f.email||""} onChange={e=>set("email",e.target.value)} type="email" placeholder="ventas@jimmyexpression.com"/></Fld></Row>
          <Row><Fld lbl="Sitio web"><Inp value={f.web||""} onChange={e=>set("web",e.target.value)} placeholder="jimmyexpression.com"/></Fld><Fld lbl="Instagram"><Inp value={f.instagram||""} onChange={e=>set("instagram",e.target.value)} placeholder="@jimmyexpression"/></Fld></Row>
          <Fld lbl="Mensaje pie de tiquete"><Txta value={f.mensajeTiquete||""} onChange={e=>set("mensajeTiquete",e.target.value)} placeholder="¡Gracias por tu visita! Síguenos en Instagram..." style={{marginBottom:16}}/></Fld>
          <button style={sx.btn} onClick={save}>Guardar datos de empresa</button>
        </div>
      )}

      {tab==="facturacion"&&(
        <div style={{...sx.card,padding:24}}>
          <div style={{color:C.cream,fontWeight:700,fontSize:16,marginBottom:18}}>Configuración de facturación</div>
          <Row><Fld lbl="Número de factura actual"><Inp type="number" value={f.numFactura||1} onChange={e=>set("numFactura",+e.target.value)}/></Fld><Fld lbl="Prefijo de factura"><Inp value={f.prefijoFactura||"FE"} onChange={e=>set("prefijoFactura",e.target.value)} placeholder="FE"/></Fld></Row>
          <Row><Fld lbl="IVA en servicios"><Sel value={f.ivaServicios||"no"} onChange={e=>set("ivaServicios",e.target.value)}><option value="no">Sin IVA (Régimen Simplificado)</option><option value="19">IVA 19%</option><option value="5">IVA 5%</option></Sel></Fld><Fld lbl="IVA en retail"><Sel value={f.ivaRetail||"19"} onChange={e=>set("ivaRetail",e.target.value)}><option value="0">Sin IVA</option><option value="19">IVA 19%</option><option value="5">IVA 5%</option></Sel></Fld></Row>
          <Row><Fld lbl="Moneda"><Sel value={f.moneda||"COP"} onChange={e=>set("moneda",e.target.value)}><option value="COP">COP — Peso Colombiano</option><option value="USD">USD — Dólar</option><option value="EUR">EUR — Euro</option></Sel></Fld><Fld lbl="Resolución DIAN (opcional)"><Inp value={f.resolucionDian||""} onChange={e=>set("resolucionDian",e.target.value)} placeholder="18764000001234"/></Fld></Row>
          <div style={{...sx.card,padding:14,marginBottom:16,background:C.goldD,border:`1px solid ${C.gold}44`}}>
            <div style={{color:C.gold,fontWeight:700,fontSize:13,marginBottom:4}}>💡 Sobre la facturación electrónica en Colombia</div>
            <div style={{color:C.muted,fontSize:12,lineHeight:1.6}}>Si eres responsable de IVA, debes emitir factura electrónica validada por DIAN. Puedes habilitarte en el portal de la DIAN (portalfacturador.dian.gov.co). Las facturas generadas aquí son documentos equivalentes para régimen simplificado.</div>
          </div>
          <button style={sx.btn} onClick={save}>Guardar configuración</button>
        </div>
      )}

      {tab==="apariencia"&&(
        <div style={{...sx.card,padding:24}}>
          <div style={{color:C.cream,fontWeight:700,fontSize:16,marginBottom:18}}>Apariencia del sistema</div>
          <Row><Fld lbl="Logo (URL o emoji)"><Inp value={f.logoEmoji||"✂️"} onChange={e=>set("logoEmoji",e.target.value)} placeholder="✂️ o URL de imagen"/></Fld><Fld lbl="Color principal"><Inp value={f.colorPrincipal||"#C9A84C"} onChange={e=>set("colorPrincipal",e.target.value)} type="color" style={{height:42,padding:4}}/></Fld></Row>
          <Row><Fld lbl="Nombre en la app"><Inp value={f.appNombre||""} onChange={e=>set("appNombre",e.target.value)} placeholder="Jimmy Expression Pro"/></Fld><Fld lbl="Slogan"><Inp value={f.slogan||""} onChange={e=>set("slogan",e.target.value)} placeholder="New Concept Beauty"/></Fld></Row>
          <div style={{...sx.card,padding:16,marginBottom:16,background:C.surface,border:`1px solid ${C.border}`}}>
            <div style={{color:C.muted,fontSize:11,marginBottom:8}}>Vista previa del header</div>
            <div style={{display:"flex",alignItems:"center",gap:10}}>
              <div style={{width:34,height:34,borderRadius:9,background:`linear-gradient(135deg,${f.colorPrincipal||C.gold},${C.rose})`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:16}}>{f.logoEmoji||"✂️"}</div>
              <div><div style={{color:C.cream,fontWeight:800,fontSize:14}}>{(f.appNombre||"JIMMY EXPRESSION").toUpperCase()}</div><div style={{color:C.muted,fontSize:10,letterSpacing:2,textTransform:"uppercase"}}>{f.slogan||"New Concept Beauty"}</div></div>
            </div>
          </div>
          <button style={sx.btn} onClick={save}>Guardar apariencia</button>
        </div>
      )}

      {tab==="integraciones"&&(
        <div>
          {/* Google Calendar */}
          <div style={{...sx.card,padding:22,marginBottom:14,border:`1px solid ${C.blue}44`}}>
            <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:16}}>
              <div style={{width:44,height:44,borderRadius:10,background:"#4285F4",display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,flexShrink:0}}>📅</div>
              <div>
                <div style={{color:C.cream,fontWeight:700,fontSize:15}}>Google Calendar</div>
                <div style={{color:C.muted,fontSize:12}}>Sincroniza citas automáticamente con tu Google Calendar</div>
              </div>
              <div style={{marginLeft:"auto"}}><Badge c={C.green} sm>✓ Disponible</Badge></div>
            </div>
            <div style={{...sx.card,padding:14,background:C.blueD,border:`1px solid ${C.blue}44`,marginBottom:14}}>
              <div style={{color:C.blue,fontSize:13,lineHeight:1.6}}>
                <b>Cómo funciona:</b> Al hacer clic en el botón 📅 GCal de cualquier cita en la Agenda, se abre Google Calendar con todos los datos prellenados (título, cliente, servicio, duración, dirección del salón). Un clic para agregar al calendario.
              </div>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:14}}>
              {[
                {icon:"📍",title:"Dirección automática",desc:"Usa la dirección del salón configurada en Empresa"},
                {icon:"⏱",title:"Duración real",desc:"Toma la duración exacta de cada servicio"},
                {icon:"👤",title:"Datos del cliente",desc:"Nombre, teléfono e indicaciones en la descripción"},
                {icon:"🔔",title:"Sin cuenta requerida",desc:"Funciona con cualquier cuenta de Google Calendar"},
              ].map(x=>(
                <div key={x.icon} style={{...sx.card,padding:12,background:C.surface}}>
                  <div style={{fontSize:20,marginBottom:4}}>{x.icon}</div>
                  <div style={{color:C.cream,fontWeight:600,fontSize:12}}>{x.title}</div>
                  <div style={{color:C.muted,fontSize:11,marginTop:2}}>{x.desc}</div>
                </div>
              ))}
            </div>
            <div style={{color:C.muted,fontSize:11}}>
              💡 Para sincronización automática en tiempo real (sin hacer clic), se requiere integración con Google Calendar API. Contacta al administrador del sistema para habilitarla.
            </div>
          </div>

          {/* WhatsApp Business */}
          <div style={{...sx.card,padding:22,marginBottom:14,border:`1px solid ${C.green}44`}}>
            <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:14}}>
              <div style={{width:44,height:44,borderRadius:10,background:C.green,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,flexShrink:0}}>📲</div>
              <div>
                <div style={{color:C.cream,fontWeight:700,fontSize:15}}>WhatsApp Business</div>
                <div style={{color:C.muted,fontSize:12}}>Envío de confirmaciones y bauchers por WhatsApp</div>
              </div>
              <div style={{marginLeft:"auto"}}><Badge c={C.green} sm>✓ Activo</Badge></div>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
              {[
                {icon:"✅",title:"Confirmación de citas online",desc:"Botón en panel de pendientes"},
                {icon:"🧾",title:"Envío de tiquetes",desc:"Desde la caja con un clic"},
                {icon:"📄",title:"Envío de facturas",desc:"Resumen prellenado en el mensaje"},
                {icon:"📢",title:"Campañas de marketing",desc:"Módulo de Marketing → WhatsApp"},
              ].map(x=>(
                <div key={x.icon} style={{...sx.card,padding:12,background:C.surface}}>
                  <div style={{fontSize:20,marginBottom:4}}>{x.icon}</div>
                  <div style={{color:C.cream,fontWeight:600,fontSize:12}}>{x.title}</div>
                  <div style={{color:C.muted,fontSize:11,marginTop:2}}>{x.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* DIAN / Facturación electrónica */}
          <div style={{...sx.card,padding:22,border:`1px solid ${C.orange}44`}}>
            <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:14}}>
              <div style={{width:44,height:44,borderRadius:10,background:C.orangeD,border:`1px solid ${C.orange}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,flexShrink:0}}>🏛</div>
              <div>
                <div style={{color:C.cream,fontWeight:700,fontSize:15}}>DIAN — Facturación Electrónica</div>
                <div style={{color:C.muted,fontSize:12}}>Integración con el portal de facturación de la DIAN</div>
              </div>
              <div style={{marginLeft:"auto"}}><Badge c={C.orange} sm>Próximamente</Badge></div>
            </div>
            <div style={{color:C.muted,fontSize:13,lineHeight:1.6}}>
              Si eres responsable de IVA, debes habilitarte en el portal de la DIAN (portalfacturador.dian.gov.co). Las facturas actuales son documentos equivalentes válidos para régimen simplificado. La integración directa con DIAN estará disponible en la próxima versión.
            </div>
          </div>
        </div>
      )}
      {tab==="cuenta"&&(
        <div style={{...sx.card,padding:24}}>
          <div style={{color:C.cream,fontWeight:700,fontSize:16,marginBottom:18}}>Cuenta de administrador</div>
          <Row><Fld lbl="Nombre del administrador"><Inp value={f.adminNombre||""} onChange={e=>set("adminNombre",e.target.value)} placeholder="Jimmy Rivera"/></Fld><Fld lbl="Email de acceso"><Inp value={f.adminEmail||""} onChange={e=>set("adminEmail",e.target.value)} type="email" placeholder="admin@jimmyexpression.com"/></Fld></Row>
          <Row><Fld lbl="Teléfono de contacto"><Inp value={f.adminTel||""} onChange={e=>set("adminTel",e.target.value)} placeholder="+57 316 447 4596"/></Fld><Fld lbl="Plan actual"><Sel value={f.plan||"pro"} onChange={e=>set("plan",e.target.value)}><option value="basico">Básico — $49.000/mes</option><option value="pro">Pro — $99.000/mes</option><option value="enterprise">Enterprise — $199.000/mes</option></Sel></Fld></Row>
          <Divider/>
          <div style={{color:C.cream,fontWeight:600,marginBottom:12}}>Seguridad</div>
          <Row><Fld lbl="Nueva contraseña"><Inp type="password" placeholder="••••••••"/></Fld><Fld lbl="Confirmar contraseña"><Inp type="password" placeholder="••••••••"/></Fld></Row>
          <div style={{display:"flex",gap:8,marginTop:8}}>
            <button style={sx.btn} onClick={save}>Guardar cuenta</button>
            <button style={sx.ghost}>Cambiar contraseña</button>
          </div>
          <Divider/>
          <div style={{...sx.card,padding:14,background:C.redD,border:`1px solid ${C.red}44`}}>
            <div style={{color:C.red,fontWeight:700,marginBottom:6}}>Zona de peligro</div>
            <div style={{color:C.muted,fontSize:12,marginBottom:10}}>Exportar o eliminar todos los datos del sistema</div>
            <div style={{display:"flex",gap:8}}>
              <button style={{...sx.ghost,fontSize:12}} onClick={()=>toast("Exportando datos...","warn")}>📥 Exportar datos</button>
              <button style={{...sx.danger,fontSize:12}} onClick={()=>toast("Acción no disponible en demo","error")}>🗑 Eliminar cuenta</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
// ── ESTADÍSTICAS ───────────────────────────────────────────────────
function Estadisticas({apts,sales,clients,svcs,staff}){
  const [rango,setRango]=useState("mes");
  const [desdeE,setDesdeE]=useState(D0(-30));
  const [hastaE,setHastaE]=useState(D0(0));
  const [mesE,setMesE]=useState(new Date().getMonth());
  const mNamesE=["Ene","Feb","Mar","Abr","May","Jun","Jul","Ago","Sep","Oct","Nov","Dic"];

  const enRangoE=(fecha)=>{
    if(rango==="mes") return new Date(fecha).getMonth()===mesE;
    if(rango==="semana"){const d=new Date(fecha);const hoy=new Date();const diff=(hoy-d)/864e5;return diff>=0&&diff<=7;}
    return fecha>=desdeE&&fecha<=hastaE;
  };
  const aptsF=apts.filter(a=>enRangoE(a.date));
  const salesF=sales.filter(s=>enRangoE(s.date));
  const topSvcs=svcs.map(s=>{
    const n=aptsF.filter(a=>a.sid===s.id&&a.status==="completed").length+Math.floor(Math.random()*4+1);
    return{...s,n,rev:n*s.price};
  }).sort((a,b)=>b.rev-a.rev).slice(0,6);
  const maxRev=Math.max(...topSvcs.map(s=>s.rev),1);
  const srcs=clients.reduce((acc,c)=>{acc[c.src]=(acc[c.src]||0)+1;return acc;},{});
  const srcColors=[C.gold,C.rose,C.blue,C.purple,C.green,C.orange];

  return(
    <div>
      {/* Filtro de fechas estadísticas */}
      <div style={{...sx.card,padding:14,marginBottom:14}}>
        <div style={{display:"flex",gap:8,alignItems:"center",flexWrap:"wrap"}}>
          <span style={{color:C.muted,fontSize:11,fontWeight:600}}>Ver período:</span>
          {[{id:"semana",l:"Última semana"},{id:"mes",l:"Este mes"},{id:"rango",l:"Rango libre"}].map(r=>(
            <button key={r.id} onClick={()=>setRango(r.id)} style={{...(rango===r.id?sx.btn:sx.ghost),padding:"5px 12px",fontSize:11}}>{r.l}</button>
          ))}
          {rango==="mes"&&<div style={{display:"flex",gap:4,flexWrap:"wrap",marginLeft:8}}>
            {mNamesE.map((m,i)=><button key={i} onClick={()=>setMesE(i)} style={{...(mesE===i?sx.btn:sx.ghost),padding:"4px 9px",fontSize:10}}>{m}</button>)}
          </div>}
          {rango==="rango"&&<div style={{display:"flex",gap:8,alignItems:"flex-end"}}>
            <Fld lbl="Desde"><Inp type="date" value={desdeE} onChange={e=>setDesdeE(e.target.value)} style={{width:140}}/></Fld>
            <Fld lbl="Hasta"><Inp type="date" value={hastaE} onChange={e=>setHastaE(e.target.value)} style={{width:140}}/></Fld>
            <div style={{display:"flex",gap:4,paddingBottom:1}}>
              {[{l:"7d",d:-7},{l:"15d",d:-15},{l:"30d",d:-30},{l:"90d",d:-90}].map(r2=>(
                <button key={r2.l} onClick={()=>{setDesdeE(D0(r2.d));setHastaE(D0(0));}} style={{...sx.ghost,padding:"4px 8px",fontSize:10}}>{r2.l}</button>
              ))}
            </div>
          </div>}
        </div>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14,marginBottom:14}}>
        <div style={{...sx.card,padding:18}}>
          <div style={{color:C.muted,fontSize:10,textTransform:"uppercase",letterSpacing:1.5,marginBottom:4}}>Ingresos YTD 2025</div>
          <div style={{color:C.goldL,fontWeight:800,fontSize:22,marginBottom:12}}>{fmtM(HIST.reduce((a,b)=>a+b.rev,0))}</div>
          <BarM data={HIST} ky="rev" color={C.gold}/>
        </div>
        <div style={{...sx.card,padding:18}}>
          <div style={{color:C.muted,fontSize:10,textTransform:"uppercase",letterSpacing:1.5,marginBottom:4}}>Clientes por mes</div>
          <div style={{color:C.rose,fontWeight:800,fontSize:22,marginBottom:12}}>{HIST.reduce((a,b)=>a+b.cli,0)} total</div>
          <BarM data={HIST} ky="cli" color={C.rose}/>
        </div>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1.4fr 1fr",gap:14,marginBottom:14}}>
        <div style={{...sx.card,padding:18}}>
          <div style={{color:C.muted,fontSize:10,textTransform:"uppercase",letterSpacing:1.5,marginBottom:14}}>Top servicios por ingresos</div>
          {topSvcs.map((s,i)=>(
            <div key={s.id} style={{marginBottom:13}}>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}>
                <div style={{display:"flex",gap:7,alignItems:"center"}}><div style={{width:6,height:6,borderRadius:"50%",background:s.color,flexShrink:0}}/><span style={{color:C.cream,fontSize:12}}>{s.name}</span></div>
                <div style={{textAlign:"right"}}><span style={{color:C.goldL,fontWeight:700,fontSize:12}}>{fmtM(s.rev)}</span><span style={{color:C.muted,fontSize:11,marginLeft:8}}>{s.n}x</span></div>
              </div>
              <div style={{height:4,background:C.border,borderRadius:2,overflow:"hidden"}}><div style={{width:`${(s.rev/maxRev)*100}%`,height:"100%",background:`linear-gradient(90deg,${s.color},${s.color}88)`,borderRadius:2}}/></div>
            </div>
          ))}
        </div>
        <div style={{...sx.card,padding:18}}>
          <div style={{color:C.muted,fontSize:10,textTransform:"uppercase",letterSpacing:1.5,marginBottom:14}}>Origen de clientes</div>
          {Object.entries(srcs).sort((a,b)=>b[1]-a[1]).map(([src,n],i)=>{
            const col=srcColors[i%srcColors.length];
            return(
              <div key={src} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"7px 0",borderBottom:`1px solid ${C.border}11`}}>
                <span style={{color:C.cream,fontSize:12}}>{src}</span>
                <div style={{display:"flex",alignItems:"center",gap:8}}>
                  <div style={{height:4,width:56,background:C.border,borderRadius:2,overflow:"hidden"}}><div style={{width:`${(n/clients.length)*100}%`,height:"100%",background:col}}/></div>
                  <span style={{color:col,fontWeight:700,fontSize:13,minWidth:18,textAlign:"right"}}>{n}</span>
                </div>
              </div>
            );
          })}
          <div style={{color:C.muted,fontSize:11,marginTop:10}}>Total: {clients.length} clientes</div>
        </div>
      </div>
      <div style={{...sx.card,padding:18,marginBottom:14}}>
        <div style={{color:C.muted,fontSize:10,textTransform:"uppercase",letterSpacing:1.5,marginBottom:14}}>Rendimiento por estilista</div>
        {staff.filter(s=>s.active).map((m,i)=>{
          const rev=[5800000,4600000,3900000][i]||2000000;
          return(
            <div key={m.id} style={{display:"flex",alignItems:"center",gap:12,marginBottom:14}}>
              <Ava name={m.name} color={m.color} size={38}/>
              <div style={{flex:1}}>
                <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}><span style={{color:C.cream,fontWeight:600,fontSize:13}}>{m.name}</span><span style={{color:m.color,fontWeight:800}}>{fmtM(rev)}</span></div>
                <div style={{height:5,background:C.border,borderRadius:3,overflow:"hidden"}}><div style={{width:`${(rev/5800000)*100}%`,height:"100%",background:m.color,borderRadius:3}}/></div>
              </div>
            </div>
          );
        })}
      </div>
      <div style={{...sx.card,overflow:"hidden"}}>
        <table style={{width:"100%",borderCollapse:"collapse"}}>
          <thead><tr style={{borderBottom:`1px solid ${C.border}`}}>{["Mes","Ingresos","Retail","Servicios","Clientes","Prom./cliente"].map(h=><th key={h} style={{color:C.muted,fontSize:10,letterSpacing:1,textTransform:"uppercase",padding:"11px 14px",textAlign:"left"}}>{h}</th>)}</tr></thead>
          <tbody>{HIST.slice().reverse().map((m,i)=>(
            <tr key={m.m} style={{borderBottom:i<HIST.length-1?`1px solid ${C.border}11`:"none",background:i%2===0?"transparent":C.surface+"22"}}>
              <td style={{color:C.cream,fontWeight:700,padding:"11px 14px"}}>{m.m}</td>
              <td style={{color:C.goldL,fontWeight:700,padding:"11px 14px"}}>{fmt(m.rev)}</td>
              <td style={{color:C.purple,padding:"11px 14px"}}>{fmt(m.retail)}</td>
              <td style={{color:C.blue,padding:"11px 14px"}}>{m.svcs}</td>
              <td style={{color:C.rose,padding:"11px 14px"}}>{m.cli}</td>
              <td style={{color:C.green,padding:"11px 14px"}}>{fmt(Math.round(m.rev/m.cli))}</td>
            </tr>
          ))}</tbody>
        </table>
      </div>
    </div>
  );
}

// ── MARKETING ──────────────────────────────────────────────────────
function Marketing({clients,toast}){
  const [tab,setTab]=useState("campanas");
  const [seg,setSeg]=useState("vip");
  const [msg,setMsg]=useState("");

  const segs={
    vip:{l:"Clientes VIP",icon:"⭐",clients:clients.filter(c=>(c.tags||[]).includes("VIP")),c:C.gold},
    inactive:{l:"Sin visita +30 días",icon:"😴",clients:clients.filter(c=>c.lastVisit&&(new Date()-new Date(c.lastVisit))>30*864e5),c:C.orange},
    bday:{l:"Cumpleaños este mes",icon:"🎂",clients:clients.filter(c=>{const b=new Date(c.bday||"");return b.getMonth()===new Date().getMonth();}),c:C.rose},
    tourist:{l:"Turistas",icon:"✈",clients:clients.filter(c=>(c.tags||[]).includes("Turista")),c:C.blue},
    new:{l:"Nuevos clientes",icon:"✨",clients:clients.filter(c=>c.visits<=2),c:C.purple},
  };
  const tpls={
    vip:"Hola {nombre} 💛 Como clienta VIP de Jimmy Expression, tienes un 15% de descuento en tu próxima visita este mes. ¡Escríbenos para agendar! 📍 Pinar del Río, El Poblado, Medellín.",
    inactive:"Hola {nombre} 😊 Te extrañamos en Jimmy Expression. Ha pasado un tiempo desde tu última visita — ¿qué tal si renovamos tus extensiones? ¡Te esperamos!",
    bday:"Hola {nombre} 🎂🎉 ¡Feliz cumpleaños! En Jimmy Expression te regalamos 20% de descuento en cualquier servicio este mes. ¡Celébralo con nosotros!",
    tourist:"Hi {nombre} 🌟 Thank you for visiting Jimmy Expression in Medellín! We specialize in premium hair extensions. Book your next appointment at jimmyexpression.com",
    new:"Hola {nombre} 👋 Gracias por confiar en Jimmy Expression. Queremos que seas parte de nuestra familia — tu próxima visita tiene 10% de descuento.",
  };
  useEffect(()=>setMsg(tpls[seg]||""),[seg]);
  const cur=segs[seg];

  return(
    <div>
      <div style={{display:"flex",gap:6,marginBottom:18}}>
        {["campanas","fidelizacion","resenas"].map(t=><button key={t} onClick={()=>setTab(t)} style={{...(tab===t?sx.btn:sx.ghost),padding:"7px 14px",fontSize:12}}>{t==="campanas"?"📲 WhatsApp":t==="fidelizacion"?"⭐ Fidelización":"🌟 Reseñas"}</button>)}
      </div>
      {tab==="campanas"&&(
        <div style={{display:"grid",gridTemplateColumns:"1fr 1.5fr",gap:14}}>
          <div>
            <div style={{color:C.muted,fontSize:10,textTransform:"uppercase",letterSpacing:1.5,marginBottom:10}}>Segmentos</div>
            {Object.entries(segs).map(([k,s2])=>(
              <div key={k} onClick={()=>setSeg(k)} style={{...sx.card,padding:13,marginBottom:7,cursor:"pointer",border:`1px solid ${seg===k?s2.c:C.border}`,background:seg===k?s2.c+"11":C.card}}>
                <div style={{display:"flex",alignItems:"center",gap:9}}><span style={{fontSize:18}}>{s2.icon}</span><div style={{flex:1}}><div style={{color:C.cream,fontWeight:600,fontSize:12}}>{s2.l}</div><div style={{color:s2.c,fontWeight:700,fontSize:11,marginTop:1}}>{s2.clients.length} clientes</div></div>{seg===k&&<span style={{color:s2.c}}>›</span>}</div>
              </div>
            ))}
          </div>
          <div>
            <div style={{color:C.muted,fontSize:10,textTransform:"uppercase",letterSpacing:1.5,marginBottom:10}}>{cur.l} — {cur.clients.length} contactos</div>
            <Txta value={msg} onChange={e=>setMsg(e.target.value)} style={{minHeight:130,marginBottom:10}}/>
            <div style={{...sx.card,padding:11,marginBottom:10,background:C.surface}}>
              <div style={{color:C.muted,fontSize:10,marginBottom:4}}>Vista previa → {cur.clients[0]?.name||"Cliente"}</div>
              <div style={{color:C.cream,fontSize:12,whiteSpace:"pre-wrap",lineHeight:1.5}}>{msg.replace("{nombre}",cur.clients[0]?.name?.split(" ")[0]||"Cliente")}</div>
            </div>
            <div style={{color:C.muted,fontSize:11,marginBottom:10}}>{cur.clients.map(c=>c.name.split(" ")[0]).join(", ")||"Ningún cliente en este segmento"}</div>
            <div style={{display:"flex",gap:8}}>
              <button style={{...sx.btn,background:C.green}} onClick={()=>toast(`✅ Campaña enviada a ${cur.clients.length} clientes`)}>📲 Enviar por WhatsApp</button>
              <button style={sx.ghost} onClick={()=>setMsg(tpls[seg])}>Restaurar</button>
            </div>
          </div>
        </div>
      )}
      {tab==="fidelizacion"&&(
        <div>
          <div style={{...sx.card,padding:18,marginBottom:14,border:`1px solid ${C.gold}44`}}>
            <div style={{color:C.goldL,fontWeight:700,fontSize:15,marginBottom:6}}>Programa de Puntos Jimmy Expression</div>
            <div style={{color:C.muted,fontSize:13,marginBottom:14}}>Cada $1.000 COP gastado = 1 punto · 100 puntos = $5.000 de descuento</div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:10}}>
              {[{l:"Bronce",min:0,max:199,c:C.orange,icon:"🥉",b:"5% en retail"},{l:"Plata",min:200,max:499,c:C.muted,icon:"🥈",b:"10% en servicios"},{l:"Oro",min:500,max:9999,c:C.gold,icon:"🥇",b:"15% + acceso VIP"}].map(lv=>(
                <div key={lv.l} style={{...sx.card,padding:13,textAlign:"center",border:`1px solid ${lv.c}44`}}>
                  <div style={{fontSize:26}}>{lv.icon}</div>
                  <div style={{color:lv.c,fontWeight:800,fontSize:14,marginTop:4}}>{lv.l}</div>
                  <div style={{color:C.muted,fontSize:10,marginTop:2}}>{lv.min}–{lv.max} pts</div>
                  <div style={{color:C.cream,fontSize:11,marginTop:5}}>{lv.b}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{color:C.muted,fontSize:10,textTransform:"uppercase",letterSpacing:1.5,marginBottom:10}}>Ranking de fidelidad</div>
          {[...clients].sort((a,b)=>b.pts-a.pts).map((c,i)=>{
            const lv=c.pts>=500?"Oro":c.pts>=200?"Plata":"Bronce";
            const lc=lv==="Oro"?C.gold:lv==="Plata"?C.muted:C.orange;
            return(
              <div key={c.id} style={{...sx.card,padding:"11px 16px",marginBottom:7,display:"flex",alignItems:"center",gap:11}}>
                <div style={{color:C.muted,fontWeight:700,fontSize:13,minWidth:22,textAlign:"center"}}>{i+1}</div>
                <Ava name={c.name} color={C.gold} size={32}/>
                <div style={{flex:1}}><div style={{color:C.cream,fontWeight:600,fontSize:13}}>{c.name}</div><div style={{color:C.muted,fontSize:11}}>{c.visits} visitas · {fmt(c.spent)}</div></div>
                <Badge c={lc} sm>{lv}</Badge>
                <div style={{color:lc,fontWeight:800,fontSize:17,minWidth:56,textAlign:"right"}}>{c.pts}</div>
              </div>
            );
          })}
        </div>
      )}
      {tab==="resenas"&&(
        <div>
          <div style={{...sx.card,padding:18,marginBottom:14}}>
            <div style={{color:C.goldL,fontWeight:700,fontSize:15,marginBottom:8}}>Solicitar reseña en Google</div>
            <div style={{color:C.muted,fontSize:13,marginBottom:14}}>Envía automáticamente a clientes que completaron servicio hoy.</div>
            <div style={{...sx.card,padding:13,background:C.surface,marginBottom:12}}>
              <div style={{color:C.cream,fontSize:13,lineHeight:1.6}}>"Hola {"{nombre}"} 🌟 Gracias por visitarnos en Jimmy Expression. Tu opinión es muy importante. ¿Nos dejas una reseña en Google? Solo toma 1 min 🙏 → g.page/jimmyexpression"</div>
            </div>
            <button style={{...sx.btn,background:C.blue}} onClick={()=>toast("⭐ Solicitudes enviadas")}>Enviar solicitud de reseña</button>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:12}}>
            {[{l:"Google Rating",v:"4.9 ⭐",s:"47 reseñas",c:C.gold},{l:"NPS Score",v:"78",s:"Muy bueno",c:C.green},{l:"Retención",v:"68%",s:"clientes recurrentes",c:C.rose}].map(k=>(
              <div key={k.l} style={{...sx.card,padding:16,textAlign:"center"}}><div style={{color:k.c,fontWeight:800,fontSize:22}}>{k.v}</div><div style={{color:C.muted,fontSize:10,textTransform:"uppercase",letterSpacing:1,marginTop:4}}>{k.l}</div><div style={{color:C.muted,fontSize:11,marginTop:2}}>{k.s}</div></div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ── SERVICIOS ──────────────────────────────────────────────────────
function Servicios({svcs,setSvcs,staff,toast}){
  const [modal,setModal]=useState(null);
  function Form({svc}){
    const cats=["Extensiones","Biomédico","Color","Mantenimiento","Tratamiento","Básico","Otro"];
    const cols=[C.gold,C.goldL,C.rose,C.blue,C.green,C.purple,C.orange,C.muted];
    const emojis=["💛","✨","🌸","🔬","🔧","🎨","🌟","✂️","💆","🧖"];
    const blank={name:"",price:0,duration:60,cat:"Extensiones",color:C.gold,img:"💛",active:true,desc:""};
    const [f,setF]=useState(svc||blank);
    const set=(k,v)=>setF(p=>({...p,[k]:v}));
    const save=()=>{
      if(!f.name){toast("El nombre es requerido","error");return;}
      const fn={...f,price:+f.price,duration:+f.duration};
      if(svc){setSvcs(p=>p.map(s=>s.id===svc.id?fn:s));}else{setSvcs(p=>[...p,{...fn,id:uid()}]);}
      toast(svc?"Servicio actualizado":"Servicio creado");setModal(null);
    };
    const del=()=>{setSvcs(p=>p.filter(s=>s.id!==svc.id));toast("Eliminado","warn");setModal(null);};
    return(
      <Modal title={svc?"Editar servicio":"Nuevo servicio"} onClose={()=>setModal(null)}>
        <Row><Fld lbl="Nombre *"><Inp value={f.name} onChange={e=>set("name",e.target.value)}/></Fld><Fld lbl="Categoría"><Sel value={f.cat} onChange={e=>set("cat",e.target.value)}>{cats.map(c=><option key={c}>{c}</option>)}</Sel></Fld></Row>
        <Row cols={3}>
          <Fld lbl="Precio (COP)"><Inp type="number" value={f.price} onChange={e=>set("price",e.target.value)}/></Fld>
          <Fld lbl="Duración (minutos)"><Inp type="number" value={f.duration} onChange={e=>set("duration",e.target.value)} min={5} step={5}/></Fld>
          <Fld lbl="Duración aprox.">
            <div style={{...sx.inp,background:C.surface,color:C.gold,fontWeight:600,cursor:"default"}}>
              {+f.duration>=60?`${Math.floor(+f.duration/60)}h ${+f.duration%60>0?+f.duration%60+"min":""}`.trim():`${f.duration} min`}
            </div>
          </Fld>
        </Row>
        <Fld lbl="Emoji"><div style={{display:"flex",gap:5,flexWrap:"wrap",marginTop:4}}>{emojis.map(e=><button key={e} onClick={()=>set("img",e)} style={{fontSize:18,padding:"4px 6px",background:f.img===e?C.goldD:"transparent",border:`1px solid ${f.img===e?C.gold:C.border}`,borderRadius:5,cursor:"pointer"}}>{e}</button>)}</div></Fld>
        <Fld lbl="Color en agenda"><div style={{display:"flex",gap:7,marginTop:4}}>{cols.map(c=><div key={c} onClick={()=>set("color",c)} style={{width:24,height:24,borderRadius:"50%",background:c,cursor:"pointer",border:`3px solid ${f.color===c?"#fff":"transparent"}`}}/>)}</div></Fld>
        <Fld lbl="Descripción"><Txta value={f.desc} onChange={e=>set("desc",e.target.value)} placeholder="Describe el servicio..."/></Fld>

        {/* Comisiones por empleado para este servicio */}
        <div style={{...sx.card,padding:14,marginTop:4,background:C.surface}}>
          <div style={{color:C.muted,fontSize:10,textTransform:"uppercase",letterSpacing:1,marginBottom:10}}>
            Comisión por empleado (sobreescribe la comisión general)
          </div>
          {staff.filter(s=>s.active).map(st=>(
            <div key={st.id} style={{display:"flex",alignItems:"center",gap:10,marginBottom:8}}>
              <Ava name={st.name} color={st.color} size={26}/>
              <span style={{color:C.cream,fontSize:12,flex:1}}>{st.name}</span>
              <span style={{color:C.muted,fontSize:11,marginRight:4}}>General: {st.comm}%</span>
              <div style={{display:"flex",alignItems:"center",gap:5}}>
                <Inp type="number" min={0} max={100}
                  value={(f.comisionesPorStaff||{})[st.id]||""}
                  onChange={e=>setF(p=>({...p,comisionesPorStaff:{...(p.comisionesPorStaff||{}),[st.id]:e.target.value?+e.target.value:undefined}}))}
                  placeholder={`${st.comm}%`} style={{width:70}}/>
                <span style={{color:C.muted,fontSize:11}}>%</span>
              </div>
            </div>
          ))}
          <div style={{color:C.muted,fontSize:10,marginTop:6}}>Deja vacío para usar la comisión general del empleado</div>
        </div>
        <div style={{display:"flex",gap:8,marginTop:16}}>
          <button style={sx.btn} onClick={save}>{svc?"Guardar":"Crear"}</button>
          <button style={{...sx.ghost,padding:"9px 14px"}} onClick={()=>setF(p=>({...p,active:!p.active}))}>{f.active?"Desactivar":"Activar"}</button>
          <button style={sx.ghost} onClick={()=>setModal(null)}>Cancelar</button>
          {svc&&<button style={{...sx.danger,marginLeft:"auto"}} onClick={del}>Eliminar</button>}
        </div>
      </Modal>
    );
  }
  const cats=[...new Set(svcs.map(s=>s.cat))];
  return(
    <div>
      <div style={{display:"flex",justifyContent:"flex-end",marginBottom:14}}>
        <button style={sx.btn} onClick={()=>setModal({svc:null})}>+ Nuevo servicio</button>
      </div>
      {cats.map(cat=>(
        <div key={cat} style={{marginBottom:20}}>
          <div style={{color:C.muted,fontSize:10,letterSpacing:2,textTransform:"uppercase",marginBottom:9}}>{cat}</div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))",gap:9}}>
            {svcs.filter(s=>s.cat===cat).map(svc=>(
              <div key={svc.id} onClick={()=>setModal({svc})} style={{...sx.card,padding:15,borderLeft:`3px solid ${svc.color}`,cursor:"pointer",opacity:svc.active?1:0.5,transition:"background .15s"}} onMouseEnter={e=>e.currentTarget.style.background=C.hover} onMouseLeave={e=>e.currentTarget.style.background=C.card}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
                  <div style={{color:C.cream,fontWeight:700,fontSize:13,lineHeight:1.3}}>{svc.img} {svc.name}</div>
                  {!svc.active&&<Badge c={C.muted} sm>Inactivo</Badge>}
                </div>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:7}}>
                  <div>
                    <div style={{color:C.muted,fontSize:9,textTransform:"uppercase",letterSpacing:1}}>Desde</div>
                    <div style={{color:svc.color,fontWeight:800,fontSize:17}}>{fmt(svc.price)}</div>
                  </div>
                  <div style={{background:C.goldD,border:`1px solid ${C.gold}44`,borderRadius:5,padding:"2px 8px",color:C.gold,fontSize:11,fontWeight:600}}>⏱ {svc.duration}min</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
      {modal&&<Form svc={modal.svc}/>}
    </div>
  );
}
// ══════════════════════════════════════════════════════════════════


// ══════════════════════════════════════════════════════════════════
// MÓDULO: GASTOS E INGRESOS FINANCIEROS
// ══════════════════════════════════════════════════════════════════
const GASTO_CATS = ["Arriendo","Servicios públicos","Insumos","Nómina","Marketing","Equipos","Proveedores","Mantenimiento","Impuestos","Otros"];
const INGRESO_CATS = ["Préstamo","Inversión socio","Reembolso","Devolución proveedor","Anticipo cliente","Otros ingresos"];
const SEED_MOVIMIENTOS = []

function Finanzas({movimientos,setMovimientos,sales,staff,apts,svcs,toast}){
  const [tab,setTab]=useState("resumen");
  const [modal,setModal]=useState(null);
  const [filtroTipo,setFiltroTipo]=useState("todos");
  const [filtroMes,setFiltroMes]=useState(new Date().getMonth());

  const meses=["Ene","Feb","Mar","Abr","May","Jun","Jul","Ago","Sep","Oct","Nov","Dic"];
  const mesActual=movimientos.filter(m=>new Date(m.fecha).getMonth()===filtroMes&&!m.archivado);
  const filtrados=mesActual.filter(m=>filtroTipo==="todos"||m.tipo===filtroTipo);

  // Ventas del mes (servicios reales)
  const ventasMes=sales.filter(s=>new Date(s.date).getMonth()===filtroMes)
    .reduce((a,b)=>a+calcVenta(b),0);

  // Nómina del mes (salarios + comisiones calculados)
  const nominaMes=(staff||[]).reduce((acc,m)=>{
    const mVentas=sales.filter(s=>s.tid===m.id&&new Date(s.date).getMonth()===filtroMes)
      .reduce((a,b)=>a+calcBase(b),0);
    const comision=mVentas*(m.comm/100);
    const deducciones=m.base*0.08;
    const neto=m.base+comision-deducciones;
    return acc+neto;
  },0);

  const totalGastosReg=mesActual.filter(m=>m.tipo==="gasto").reduce((a,b)=>a+b.monto,0);
  const totalGastos=totalGastosReg+nominaMes;
  const totalIngresos=mesActual.filter(m=>m.tipo==="ingreso").reduce((a,b)=>a+b.monto,0);
  const utilidad=ventasMes+totalIngresos-totalGastos;
  const margenPct=ventasMes>0?((utilidad/(ventasMes+totalIngresos))*100).toFixed(1):0;

  const gastosPorCat=mesActual.filter(m=>m.tipo==="gasto").reduce((acc,m)=>{acc[m.cat]=(acc[m.cat]||0)+m.monto;return acc;},{});
  const maxGasto=Math.max(...Object.values(gastosPorCat),1);

  function MovForm({mov}){
    const blank={tipo:"gasto",cat:"Insumos",desc:"",monto:0,fecha:D0(0),pay:"efectivo",recurrente:false};
    const [f,setF]=useState(mov||blank);
    const set=(k,v)=>setF(p=>({...p,[k]:v}));
    const save=()=>{
      if(!f.desc||!f.monto){toast("Descripción y monto son requeridos","error");return;}
      const fn={...f,monto:+f.monto};
      if(mov){setMovimientos(p=>p.map(m=>m.id===mov.id?fn:m));}
      else{setMovimientos(p=>[...p,{...fn,id:uid(),archivado:false}]);}
      toast(mov?"Movimiento actualizado":`${f.tipo==="gasto"?"Gasto":"Ingreso"} registrado`);
      setModal(null);
    };
    const del=()=>{setMovimientos(p=>p.filter(m=>m.id!==mov.id));toast("Eliminado","warn");setModal(null);};
    const cats=f.tipo==="gasto"?GASTO_CATS:INGRESO_CATS;
    return(
      <Modal title={mov?`Editar ${mov.tipo}`:f.tipo==="gasto"?"Nuevo gasto":"Nuevo ingreso"} onClose={()=>setModal(null)}>
        <Row>
          <Fld lbl="Tipo">
            <Sel value={f.tipo} onChange={e=>set("tipo",e.target.value)}>
              <option value="gasto">💸 Gasto / Egreso</option>
              <option value="ingreso">💰 Ingreso de dinero</option>
            </Sel>
          </Fld>
          <Fld lbl="Categoría">
            <Sel value={f.cat} onChange={e=>set("cat",e.target.value)}>
              {cats.map(c=><option key={c}>{c}</option>)}
            </Sel>
          </Fld>
        </Row>
        <Fld lbl="Descripción *"><Inp value={f.desc} onChange={e=>set("desc",e.target.value)} placeholder="Describe el movimiento..."/></Fld>
        <Row>
          <Fld lbl="Monto (COP)"><Inp type="number" value={f.monto} onChange={e=>set("monto",e.target.value)}/></Fld>
          <Fld lbl="Fecha"><Inp type="date" value={f.fecha} onChange={e=>set("fecha",e.target.value)}/></Fld>
        </Row>
        <Row>
          <Fld lbl="Método de pago">
            <Sel value={f.pay} onChange={e=>set("pay",e.target.value)}>
              {PAY_METHODS.map(m=><option key={m} value={m}>{m.charAt(0).toUpperCase()+m.slice(1)}</option>)}
            </Sel>
          </Fld>
          <Fld lbl="¿Recurrente?">
            <Sel value={f.recurrente} onChange={e=>set("recurrente",e.target.value==="true")}>
              <option value="false">No, es único</option>
              <option value="true">Sí, se repite mensualmente</option>
            </Sel>
          </Fld>
        </Row>
        <div style={{display:"flex",gap:8,marginTop:16}}>
          <button style={{...sx.btn,background:f.tipo==="gasto"?C.red:C.green}} onClick={save}>{mov?"Guardar":"Registrar"}</button>
          <button style={sx.ghost} onClick={()=>setModal(null)}>Cancelar</button>
          {mov&&<button style={{...sx.danger,marginLeft:"auto"}} onClick={del}>Eliminar</button>}
        </div>
      </Modal>
    );
  }

  return(
    <div>
      {/* Filtros */}
      <div style={{display:"flex",gap:8,marginBottom:18,flexWrap:"wrap",justifyContent:"space-between",alignItems:"center"}}>
        <div style={{display:"flex",gap:4,flexWrap:"wrap"}}>
          {meses.map((m,i)=>(
            <button key={i} onClick={()=>setFiltroMes(i)}
              style={{...(filtroMes===i?sx.btn:sx.ghost),padding:"5px 10px",fontSize:11}}>{m}</button>
          ))}
        </div>
        <div style={{display:"flex",gap:6}}>
          {["todos","gasto","ingreso"].map(t=>(
            <button key={t} onClick={()=>setFiltroTipo(t)}
              style={{...(filtroTipo===t?sx.btn:sx.ghost),padding:"6px 12px",fontSize:11}}>
              {t==="todos"?"Todos":t==="gasto"?"💸 Gastos":"💰 Ingresos"}
            </button>
          ))}
          <button style={{...sx.btn,background:C.red}} onClick={()=>setModal({tipo:"form",mov:null,forzarTipo:"gasto"})}>+ Gasto</button>
          <button style={{...sx.btn,background:C.green}} onClick={()=>setModal({tipo:"form",mov:null,forzarTipo:"ingreso"})}>+ Ingreso</button>
        </div>
      </div>

      {/* Sub-tabs */}
      <div style={{display:"flex",gap:6,marginBottom:16}}>
        {["resumen","movimientos","flujo"].map(t=>(
          <button key={t} onClick={()=>setTab(t)}
            style={{...(tab===t?sx.btn:sx.ghost),padding:"7px 14px",fontSize:12}}>
            {t==="resumen"?"📊 Resumen":t==="movimientos"?"📋 Movimientos":"📈 Flujo de caja"}
          </button>
        ))}
      </div>

      {tab==="resumen"&&(
        <div>
          {/* KPIs */}
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(140px,1fr))",gap:12,marginBottom:18}}>
            {[
              {l:"Ventas del mes",v:fmt(ventasMes),c:C.gold,icon:"💵"},
              {l:"Ingresos extras",v:fmt(totalIngresos),c:C.green,icon:"💰"},
              {l:"Total gastos",v:fmt(totalGastos),c:C.red,icon:"💸"},
              {l:"Utilidad neta",v:fmt(utilidad),c:utilidad>=0?C.green:C.red,icon:utilidad>=0?"📈":"📉"},
            ].map(k=>(
              <div key={k.l} style={{...sx.card,padding:"16px 18px"}}>
                <div style={{fontSize:22,marginBottom:6}}>{k.icon}</div>
                <div style={{color:k.c,fontWeight:800,fontSize:20}}>{k.v}</div>
                <div style={{color:C.muted,fontSize:10,marginTop:3,textTransform:"uppercase",letterSpacing:1}}>{k.l}</div>
              </div>
            ))}
          </div>

          {/* Margen */}
          <div style={{...sx.card,padding:18,marginBottom:14}}>
            <div style={{color:C.muted,fontSize:10,textTransform:"uppercase",letterSpacing:1.5,marginBottom:12}}>Margen operacional — {meses[filtroMes]}</div>
            <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:8}}>
              <div style={{flex:1,height:10,background:C.border,borderRadius:5,overflow:"hidden"}}>
                <div style={{width:`${Math.min(100,ventasMes>0?(utilidad/ventasMes)*100:0)}%`,height:"100%",background:utilidad>=0?C.green:C.red,borderRadius:5,transition:"width .4s"}}/>
              </div>
              <div style={{color:utilidad>=0?C.green:C.red,fontWeight:800,fontSize:16,minWidth:60,textAlign:"right"}}>
                {ventasMes>0?`${((utilidad/ventasMes)*100).toFixed(1)}%`:"—"}
              </div>
            </div>
            <div style={{display:"flex",justifyContent:"space-between",fontSize:12,color:C.muted}}>
              <span>Total ingresos: <b style={{color:C.cream}}>{fmt(ventasMes+totalIngresos)}</b></span>
              <span>Total egresos: <b style={{color:C.red}}>{fmt(totalGastos)}</b></span>
            </div>
          </div>

          {/* Gastos por categoría */}
          {Object.keys(gastosPorCat).length>0&&(
            <div style={{...sx.card,padding:18,marginBottom:14}}>
              <div style={{color:C.muted,fontSize:10,textTransform:"uppercase",letterSpacing:1.5,marginBottom:14}}>Gastos por categoría</div>
              {Object.entries(gastosPorCat).sort((a,b)=>b[1]-a[1]).map(([cat,val],i)=>{
                const catColors=[C.red,C.orange,C.purple,C.blue,C.rose,C.gold,C.green,C.muted];
                const col=catColors[i%catColors.length];
                return(
                  <div key={cat} style={{marginBottom:10}}>
                    <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}>
                      <span style={{color:C.cream,fontSize:13}}>{cat}</span>
                      <span style={{color:col,fontWeight:700,fontSize:13}}>{fmt(val)}</span>
                    </div>
                    <div style={{height:5,background:C.border,borderRadius:3,overflow:"hidden"}}>
                      <div style={{width:`${(val/maxGasto)*100}%`,height:"100%",background:col,borderRadius:3}}/>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Gastos recurrentes */}
          {movimientos.filter(m=>m.recurrente&&m.tipo==="gasto").length>0&&(
            <div style={{...sx.card,padding:18,border:`1px solid ${C.orange}44`,background:C.orangeD}}>
              <div style={{color:C.orange,fontWeight:700,marginBottom:10}}>🔁 Gastos fijos recurrentes</div>
              {movimientos.filter(m=>m.recurrente&&m.tipo==="gasto").map(m=>(
                <div key={m.id} style={{display:"flex",justifyContent:"space-between",padding:"6px 0",borderBottom:`1px solid ${C.border}22`,fontSize:13}}>
                  <span style={{color:C.cream}}>{m.desc}</span>
                  <span style={{color:C.orange,fontWeight:700}}>{fmt(m.monto)}/mes</span>
                </div>
              ))}
              <div style={{color:C.orange,fontWeight:800,fontSize:15,marginTop:10,textAlign:"right"}}>
                Total fijos: {fmt(movimientos.filter(m=>m.recurrente&&m.tipo==="gasto").reduce((a,b)=>a+b.monto,0))}/mes
              </div>
            </div>
          )}
        </div>
      )}

      {tab==="movimientos"&&(
        <div>
          <div style={{...sx.card,overflow:"hidden"}}>
            <table style={{width:"100%",borderCollapse:"collapse"}}>
              <thead>
                <tr style={{borderBottom:`1px solid ${C.border}`}}>
                  {["Fecha","Tipo","Categoría","Descripción","Método","Monto",""].map(h=>(
                    <th key={h} style={{color:C.muted,fontSize:10,letterSpacing:1,textTransform:"uppercase",padding:"10px 14px",textAlign:"left"}}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtrados.length===0&&<tr><td colSpan={7} style={{color:C.muted,textAlign:"center",padding:28}}>Sin movimientos para este período</td></tr>}
                {filtrados.sort((a,b)=>b.fecha.localeCompare(a.fecha)).map((m,i)=>(
                  <tr key={m.id} style={{borderBottom:i<filtrados.length-1?`1px solid ${C.border}11`:"none",background:i%2===0?"transparent":C.surface+"33"}}>
                    <td style={{color:C.muted,padding:"10px 14px",fontSize:12}}>{m.fecha}</td>
                    <td style={{padding:"10px 14px"}}>
                      <Badge c={m.tipo==="gasto"?C.red:C.green} sm>{m.tipo==="gasto"?"💸 Gasto":"💰 Ingreso"}</Badge>
                    </td>
                    <td style={{color:C.muted,padding:"10px 14px",fontSize:12}}>{m.cat}</td>
                    <td style={{color:C.cream,padding:"10px 14px",fontSize:13}}>
                      {m.desc}{m.recurrente&&<span style={{color:C.orange,fontSize:10,marginLeft:6}}>🔁</span>}
                    </td>
                    <td style={{padding:"10px 14px"}}><Badge c={C.blue} sm>{m.pay}</Badge></td>
                    <td style={{color:m.tipo==="gasto"?C.red:C.green,fontWeight:700,padding:"10px 14px",fontSize:14}}>
                      {m.tipo==="gasto"?"-":"+"}  {fmt(m.monto)}
                    </td>
                    <td style={{padding:"10px 14px"}}>
                      <button onClick={()=>setModal({tipo:"form",mov:m})}
                        style={{background:"transparent",border:`1px solid ${C.border}`,borderRadius:5,color:C.muted,padding:"3px 8px",fontSize:11,cursor:"pointer"}}>✏</button>
                    </td>
                  </tr>
                ))}
              </tbody>
              {filtrados.length>0&&(
                <tfoot>
                  <tr style={{borderTop:`1px solid ${C.border}`}}>
                    <td colSpan={5} style={{color:C.muted,padding:"10px 14px",fontSize:12,textTransform:"uppercase",letterSpacing:1}}>Balance período</td>
                    <td style={{color:utilidad>=0?C.green:C.red,fontWeight:800,padding:"10px 14px",fontSize:16}}>
                      {utilidad>=0?"+":""}{fmt(filtrados.reduce((a,b)=>b.tipo==="ingreso"?a+b.monto:a-b.monto,0))}
                    </td>
                    <td/>
                  </tr>
                </tfoot>
              )}
            </table>
          </div>
        </div>
      )}

      {tab==="flujo"&&(
        <div>
          <div style={{...sx.card,padding:20,marginBottom:14}}>
            <div style={{color:C.muted,fontSize:10,textTransform:"uppercase",letterSpacing:1.5,marginBottom:16}}>Flujo de caja — acumulado 2025</div>
            <div style={{display:"flex",alignItems:"flex-end",gap:8,height:100}}>
              {["Ene","Feb","Mar","Abr","May","Jun"].map((m,i)=>{
                const ventas=HIST[i]?.rev||0;
                const gastosMes=movimientos.filter(mv=>new Date(mv.fecha).getMonth()===i&&mv.tipo==="gasto").reduce((a,b)=>a+b.monto,0);
                const util=ventas-gastosMes;
                const maxVal=Math.max(...["Ene","Feb","Mar","Abr","May","Jun"].map((_,j)=>{
                  const v=HIST[j]?.rev||0;
                  const g=movimientos.filter(mv=>new Date(mv.fecha).getMonth()===j&&mv.tipo==="gasto").reduce((a,b)=>a+b.monto,0);
                  return Math.abs(v-g);
                }),1);
                const pct=Math.min(100,(Math.abs(util)/maxVal)*100);
                return(
                  <div key={m} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:4}}>
                    <div style={{color:util>=0?C.green:C.red,fontSize:9,fontWeight:700}}>{fmtM(util)}</div>
                    <div style={{width:"100%",height:Math.max(4,pct*.8),background:util>=0?C.green:C.red,borderRadius:"4px 4px 0 0"}}/>
                    <span style={{color:C.muted,fontSize:10}}>{m}</span>
                  </div>
                );
              })}
            </div>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:12}}>
            {[
              {l:"Total ingresos YTD",v:fmt(HIST.reduce((a,b)=>a+b.rev,0)+movimientos.filter(m=>m.tipo==="ingreso").reduce((a,b)=>a+b.monto,0)),c:C.green},
              {l:"Total gastos YTD",v:fmt(movimientos.filter(m=>m.tipo==="gasto").reduce((a,b)=>a+b.monto,0)),c:C.red},
              {l:"Utilidad YTD",v:fmt(HIST.reduce((a,b)=>a+b.rev,0)-movimientos.filter(m=>m.tipo==="gasto").reduce((a,b)=>a+b.monto,0)),c:C.gold},
            ].map(k=>(
              <div key={k.l} style={{...sx.card,padding:16,textAlign:"center"}}>
                <div style={{color:k.c,fontWeight:800,fontSize:18}}>{k.v}</div>
                <div style={{color:C.muted,fontSize:10,marginTop:4,textTransform:"uppercase",letterSpacing:1}}>{k.l}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {modal?.tipo==="form"&&(()=>{
        const MovFormInst=()=>{
          const blank={tipo:modal.forzarTipo||"gasto",cat:modal.forzarTipo==="ingreso"?"Préstamo":"Insumos",desc:"",monto:0,fecha:D0(0),pay:"efectivo",recurrente:false};
          const [f,setF]=useState(modal.mov||blank);
          const set=(k,v)=>setF(p=>({...p,[k]:v}));
          const cats=f.tipo==="gasto"?GASTO_CATS:INGRESO_CATS;
          const save=()=>{
            if(!f.desc||!f.monto){toast("Descripción y monto requeridos","error");return;}
            const fn={...f,monto:+f.monto};
            if(modal.mov){setMovimientos(p=>p.map(m=>m.id===modal.mov.id?fn:m));}
            else{setMovimientos(p=>[...p,{...fn,id:uid(),archivado:false}]);}
            toast(modal.mov?"Actualizado":`${f.tipo==="gasto"?"Gasto":"Ingreso"} registrado`);
            setModal(null);
          };
          const del=()=>{setMovimientos(p=>p.filter(m=>m.id!==modal.mov.id));toast("Eliminado","warn");setModal(null);};
          return(
            <Modal title={modal.mov?`Editar ${modal.mov.tipo}`:f.tipo==="gasto"?"💸 Nuevo gasto":"💰 Nuevo ingreso"} onClose={()=>setModal(null)}>
              <Row>
                <Fld lbl="Tipo"><Sel value={f.tipo} onChange={e=>{set("tipo",e.target.value);set("cat",e.target.value==="gasto"?GASTO_CATS[0]:INGRESO_CATS[0]);}}><option value="gasto">💸 Gasto / Egreso</option><option value="ingreso">💰 Ingreso de dinero</option></Sel></Fld>
                <Fld lbl="Categoría"><Sel value={f.cat} onChange={e=>set("cat",e.target.value)}>{cats.map(c=><option key={c}>{c}</option>)}</Sel></Fld>
              </Row>
              <Fld lbl="Descripción *"><Inp value={f.desc} onChange={e=>set("desc",e.target.value)} placeholder="Describe el movimiento..."/></Fld>
              <Row>
                <Fld lbl="Monto (COP)"><Inp type="number" value={f.monto} onChange={e=>set("monto",e.target.value)}/></Fld>
                <Fld lbl="Fecha"><Inp type="date" value={f.fecha} onChange={e=>set("fecha",e.target.value)}/></Fld>
              </Row>
              <Row>
                <Fld lbl="Método de pago"><Sel value={f.pay} onChange={e=>set("pay",e.target.value)}>{PAY_METHODS.map(m=><option key={m} value={m}>{m.charAt(0).toUpperCase()+m.slice(1)}</option>)}</Sel></Fld>
                <Fld lbl="¿Recurrente?"><Sel value={f.recurrente} onChange={e=>set("recurrente",e.target.value==="true")}><option value="false">No, único</option><option value="true">Sí, mensual</option></Sel></Fld>
              </Row>
              <div style={{...sx.card,padding:12,marginTop:10,background:f.tipo==="gasto"?C.redD:C.greenD,border:`1px solid ${f.tipo==="gasto"?C.red:C.green}44`}}>
                <span style={{color:f.tipo==="gasto"?C.red:C.green,fontWeight:800,fontSize:16}}>{f.tipo==="gasto"?"- ":"+ "}{fmt(+f.monto||0)}</span>
              </div>
              <div style={{display:"flex",gap:8,marginTop:16}}>
                <button style={{...sx.btn,background:f.tipo==="gasto"?C.red:C.green}} onClick={save}>{modal.mov?"Guardar":"Registrar"}</button>
                <button style={sx.ghost} onClick={()=>setModal(null)}>Cancelar</button>
                {modal.mov&&<button style={{...sx.danger,marginLeft:"auto"}} onClick={del}>Eliminar</button>}
              </div>
            </Modal>
          );
        };
        return <MovFormInst/>;
      })()}
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════
// MÓDULO: LOGIN + ROLES (Gerente / Admin / Cajero)
// ══════════════════════════════════════════════════════════════════
const ROLES_CONFIG = {
  gerente:{
    label:"Gerente",color:C.gold,icon:"👑",
    permisos:{dashboard:true,agenda:true,clientes:true,caja:true,apertura:true,nomina:true,inventario:true,servicios:true,estadisticas:true,marketing:true,marketplace:true,online:true,finanzas:true,configuracion:true,usuarios:true}
  },
  admin:{
    label:"Administrador",color:C.purple,icon:"🔑",
    permisos:{dashboard:true,agenda:true,clientes:true,caja:true,apertura:true,nomina:false,inventario:true,servicios:true,estadisticas:true,marketing:true,marketplace:true,online:true,finanzas:false,configuracion:false,usuarios:false}
  },
  cajero:{
    label:"Cajero",color:C.blue,icon:"💼",
    permisos:{dashboard:true,agenda:true,clientes:false,caja:true,apertura:true,nomina:false,inventario:false,servicios:false,estadisticas:false,marketing:false,marketplace:false,online:false,finanzas:false,configuracion:false,usuarios:false}
  },
};

const SEED_USERS = [
  {id:"u1",nombre:"Jimmy Rivera",email:"jimmy@jimmyexpression.com",pin:"1234",rol:"gerente",activo:true,avatar:"👑"},
  {id:"u2",nombre:"Valentina Ríos",email:"vale@jimmyexpression.com",pin:"5678",rol:"admin",activo:true,avatar:"💜"},
  {id:"u3",nombre:"Sara Montoya",email:"sara@jimmyexpression.com",pin:"9012",rol:"cajero",activo:true,avatar:"💙"},
];

function LoginScreen({usuarios,onLogin}){
  const [selUser,setSelUser]=useState(null);
  const [pin,setPin]=useState("");
  const [error,setError]=useState("");

  const handlePin=(d)=>{
    if(d==="del"){setPin(p=>p.slice(0,-1));setError("");return;}
    const newPin=pin+d;
    setPin(newPin);
    if(newPin.length===4){
      if(newPin===selUser.pin){onLogin(selUser);}
      else{setError("PIN incorrecto");setTimeout(()=>{setPin("");setError("");},1200);}
    }
  };

  return(
    <div style={{background:C.bg,minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'Inter','Segoe UI',system-ui,sans-serif"}}>
      <div style={{width:"100%",maxWidth:420,padding:24}}>
        {/* Logo */}
        <div style={{textAlign:"center",marginBottom:32}}>
          <div style={{width:64,height:64,borderRadius:16,background:`linear-gradient(135deg,${C.gold},${C.rose})`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:28,margin:"0 auto 12px"}}>✂️</div>
          <div style={{color:C.cream,fontWeight:800,fontSize:22,letterSpacing:1}}>JIMMY EXPRESSION</div>
          <div style={{color:C.muted,fontSize:11,letterSpacing:3,textTransform:"uppercase",marginTop:3}}>Sistema de gestión</div>
        </div>

        {!selUser?(
          <div>
            <div style={{color:C.muted,fontSize:12,textAlign:"center",marginBottom:16,letterSpacing:1}}>SELECCIONA TU USUARIO</div>
            {usuarios.filter(u=>u.activo).map(u=>{
              const rol=ROLES_CONFIG[u.rol];
              return(
                <div key={u.id} onClick={()=>setSelUser(u)}
                  style={{...sx.card,padding:16,marginBottom:10,cursor:"pointer",display:"flex",alignItems:"center",gap:14,border:`1px solid ${rol?.color||C.border}33`,transition:"all .15s"}}
                  onMouseEnter={e=>e.currentTarget.style.background=C.hover}
                  onMouseLeave={e=>e.currentTarget.style.background=C.card}>
                  <div style={{width:44,height:44,borderRadius:"50%",background:rol?.color+"22",border:`2px solid ${rol?.color||C.gold}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,flexShrink:0}}>{u.avatar}</div>
                  <div style={{flex:1}}>
                    <div style={{color:C.cream,fontWeight:700,fontSize:15}}>{u.nombre}</div>
                    <div style={{color:rol?.color||C.muted,fontSize:12,marginTop:2}}>{rol?.icon} {rol?.label}</div>
                  </div>
                  <div style={{color:C.muted,fontSize:20}}>›</div>
                </div>
              );
            })}
          </div>
        ):(
          <div>
            <button onClick={()=>{setSelUser(null);setPin("");setError("");}}
              style={{...sx.ghost,padding:"6px 12px",fontSize:12,marginBottom:20}}>← Volver</button>
            <div style={{textAlign:"center",marginBottom:24}}>
              <div style={{fontSize:36,marginBottom:8}}>{selUser.avatar}</div>
              <div style={{color:C.cream,fontWeight:700,fontSize:18}}>{selUser.nombre}</div>
              <div style={{color:ROLES_CONFIG[selUser.rol]?.color||C.muted,fontSize:12,marginTop:2}}>
                {ROLES_CONFIG[selUser.rol]?.icon} {ROLES_CONFIG[selUser.rol]?.label}
              </div>
            </div>
            {/* PIN display */}
            <div style={{display:"flex",justifyContent:"center",gap:12,marginBottom:24}}>
              {[0,1,2,3].map(i=>(
                <div key={i} style={{width:16,height:16,borderRadius:"50%",background:i<pin.length?C.gold:C.border,transition:"background .1s"}}/>
              ))}
            </div>
            {error&&<div style={{color:C.red,textAlign:"center",fontSize:13,marginBottom:12,fontWeight:600}}>{error}</div>}
            {/* Numpad */}
            <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:10,maxWidth:240,margin:"0 auto"}}>
              {[1,2,3,4,5,6,7,8,9,"",0,"del"].map((d,i)=>{
                const isDel=d==="del";
                const isEmpty=d==="";
                const btnStyle={
                  height:56,borderRadius:10,
                  background:isDel?C.redD:C.card,
                  border:"1px solid "+(isDel?C.red+"44":C.border),
                  color:isDel?C.red:C.cream,
                  fontSize:isDel?18:20,fontWeight:600,
                  cursor:isEmpty?"default":"pointer",
                  transition:"all .1s",
                  visibility:isEmpty?"hidden":"visible"
                };
                return(
                  <button key={i} onClick={()=>!isEmpty&&handlePin(String(d))} style={btnStyle}
                    onMouseEnter={e=>{if(!isEmpty)e.currentTarget.style.background=isDel?C.red+"33":C.hover;}}
                    onMouseLeave={e=>{if(!isEmpty)e.currentTarget.style.background=isDel?C.redD:C.card;}}>
                    {isDel?"⌫":d}
                  </button>
                );
              })}
            </div>
            <div style={{color:C.muted,fontSize:11,textAlign:"center",marginTop:16}}>Ingresa tu PIN de 4 dígitos</div>
          </div>
        )}
      </div>
    </div>
  );
}

function Usuarios({usuarios,setUsuarios,toast}){
  const [modal,setModal]=useState(null);

  function UserForm({user}){
    const blank={nombre:"",email:"",pin:"",rol:"cajero",activo:true,avatar:"👤"};
    const [f,setF]=useState(user||blank);
    const set=(k,v)=>setF(p=>({...p,[k]:v}));
    const avatars=["👑","🔑","💼","👤","💜","💙","💛","🌸","⭐","🎨"];
    const save=()=>{
      if(!f.nombre||!f.pin){toast("Nombre y PIN son requeridos","error");return;}
      if(f.pin.length!==4||!/^\d{4}$/.test(f.pin)){toast("El PIN debe ser exactamente 4 dígitos","error");return;}
      if(user){setUsuarios(p=>p.map(u=>u.id===user.id?{...f}:u));}
      else{setUsuarios(p=>[...p,{...f,id:uid()}]);}
      toast(user?"Usuario actualizado":"Usuario creado");setModal(null);
    };
    const del=()=>{if(user.rol==="gerente"){toast("No puedes eliminar al gerente","error");return;}setUsuarios(p=>p.filter(u=>u.id!==user.id));toast("Usuario eliminado","warn");setModal(null);};
    return(
      <Modal title={user?"Editar usuario":"Nuevo usuario"} onClose={()=>setModal(null)}>
        <Row><Fld lbl="Nombre completo *"><Inp value={f.nombre} onChange={e=>set("nombre",e.target.value)}/></Fld><Fld lbl="Email"><Inp value={f.email} onChange={e=>set("email",e.target.value)} type="email"/></Fld></Row>
        <Row>
          <Fld lbl="PIN (4 dígitos) *"><Inp value={f.pin} onChange={e=>set("pin",e.target.value.replace(/\D/g,"").slice(0,4))} placeholder="••••" maxLength={4}/></Fld>
          <Fld lbl="Rol">
            <Sel value={f.rol} onChange={e=>set("rol",e.target.value)}>
              {Object.entries(ROLES_CONFIG).map(([k,v])=><option key={k} value={k}>{v.icon} {v.label}</option>)}
            </Sel>
          </Fld>
        </Row>
        <Fld lbl="Avatar">
          <div style={{display:"flex",gap:8,flexWrap:"wrap",marginTop:4}}>
            {avatars.map(a=>(
              <button key={a} onClick={()=>set("avatar",a)}
                style={{width:36,height:36,fontSize:20,background:f.avatar===a?C.goldD:"transparent",border:`2px solid ${f.avatar===a?C.gold:C.border}`,borderRadius:8,cursor:"pointer"}}>
                {a}
              </button>
            ))}
          </div>
        </Fld>
        <Fld lbl="Estado">
          <Sel value={f.activo} onChange={e=>set("activo",e.target.value==="true")}>
            <option value="true">✅ Activo</option>
            <option value="false">🚫 Inactivo</option>
          </Sel>
        </Fld>
        {/* Permisos visuales (solo lectura, definidos por rol) */}
        <div style={{...sx.card,padding:14,marginTop:12,background:C.surface}}>
          <div style={{color:C.muted,fontSize:10,textTransform:"uppercase",letterSpacing:1,marginBottom:10}}>Permisos del rol {ROLES_CONFIG[f.rol]?.label}</div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:6}}>
            {Object.entries(ROLES_CONFIG[f.rol]?.permisos||{}).map(([perm,tiene])=>(
              <div key={perm} style={{display:"flex",alignItems:"center",gap:5,fontSize:11}}>
                <span style={{color:tiene?C.green:C.red,fontSize:12}}>{tiene?"✓":"✗"}</span>
                <span style={{color:tiene?C.cream:C.muted,textTransform:"capitalize"}}>{perm}</span>
              </div>
            ))}
          </div>
        </div>
        <div style={{display:"flex",gap:8,marginTop:16}}>
          <button style={sx.btn} onClick={save}>{user?"Guardar":"Crear usuario"}</button>
          <button style={sx.ghost} onClick={()=>setModal(null)}>Cancelar</button>
          {user&&user.rol!=="gerente"&&<button style={{...sx.danger,marginLeft:"auto"}} onClick={del}>Eliminar</button>}
        </div>
      </Modal>
    );
  }

  return(
    <div>
      <div style={{display:"flex",justifyContent:"flex-end",marginBottom:16}}>
        <button style={sx.btn} onClick={()=>setModal({user:null})}>+ Nuevo usuario</button>
      </div>
      {/* Rol descriptions */}
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:12,marginBottom:20}}>
        {Object.entries(ROLES_CONFIG).map(([k,v])=>(
          <div key={k} style={{...sx.card,padding:16,border:`1px solid ${v.color}44`}}>
            <div style={{fontSize:24,marginBottom:6}}>{v.icon}</div>
            <div style={{color:v.color,fontWeight:800,fontSize:15,marginBottom:6}}>{v.label}</div>
            <div style={{display:"flex",flexDirection:"column",gap:3}}>
              {Object.entries(v.permisos).filter(([,t])=>t).slice(0,6).map(([p])=>(
                <div key={p} style={{color:C.muted,fontSize:10}}>✓ {p.charAt(0).toUpperCase()+p.slice(1)}</div>
              ))}
              {Object.values(v.permisos).filter(Boolean).length>6&&(
                <div style={{color:C.muted,fontSize:10}}>+{Object.values(v.permisos).filter(Boolean).length-6} más...</div>
              )}
            </div>
            <div style={{marginTop:8,color:C.muted,fontSize:11}}>
              {usuarios.filter(u=>u.rol===k&&u.activo).length} usuario(s) activo(s)
            </div>
          </div>
        ))}
      </div>
      {/* User list */}
      {usuarios.map(u=>{
        const rol=ROLES_CONFIG[u.rol];
        return(
          <div key={u.id} style={{...sx.card,padding:16,marginBottom:10,display:"flex",alignItems:"center",gap:14,opacity:u.activo?1:0.5}}>
            <div style={{width:44,height:44,borderRadius:"50%",background:rol?.color+"22",border:`2px solid ${rol?.color||C.gold}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,flexShrink:0}}>{u.avatar}</div>
            <div style={{flex:1}}>
              <div style={{color:C.cream,fontWeight:700,fontSize:15}}>{u.nombre}</div>
              <div style={{color:C.muted,fontSize:12}}>{u.email}</div>
              <div style={{marginTop:4,display:"flex",gap:6}}>
                <Badge c={rol?.color||C.muted} sm>{rol?.icon} {rol?.label}</Badge>
                <Badge c={u.activo?C.green:C.red} sm>{u.activo?"Activo":"Inactivo"}</Badge>
              </div>
            </div>
            <div style={{textAlign:"right"}}>
              <div style={{color:C.muted,fontSize:11,marginBottom:4}}>PIN: {"•".repeat(4)}</div>
              <button style={{...sx.ghost,padding:"6px 12px",fontSize:12}} onClick={()=>setModal({user:u})}>Editar</button>
            </div>
          </div>
        );
      })}
      {modal&&<UserForm user={modal.user}/>}
    </div>
  );
}


// ══════════════════════════════════════════════════════════════════
// APP SHELL — versión final con roles, finanzas, login
// ══════════════════════════════════════════════════════════════════
const ALL_TABS=[
  {id:"dashboard",label:"Dashboard"},
  {id:"agenda",label:"Agenda"},
  {id:"clientes",label:"Clientes"},
  {id:"caja",label:"Caja"},
  {id:"apertura",label:"Apertura/Cierre"},
  {id:"finanzas",label:"Finanzas"},
  {id:"nomina",label:"Nómina"},
  {id:"inventario",label:"Inventario"},
  {id:"servicios",label:"Servicios"},
  {id:"estadisticas",label:"Estadísticas"},
  {id:"marketing",label:"Marketing"},
  {id:"marketplace",label:"Marketplace"},
  {id:"online",label:"Citas Online"},
  {id:"usuarios",label:"👥 Usuarios"},
  {id:"configuracion",label:"⚙ Config"},
];
const TITLES={
  dashboard:"Dashboard",agenda:"Agenda",clientes:"Clientes",
  caja:"Caja del día",apertura:"Apertura y Cierre de Caja",
  finanzas:"Gastos e Ingresos",nomina:"Nómina",
  inventario:"Inventario",servicios:"Catálogo de servicios",
  estadisticas:"Estadísticas",marketing:"Marketing & Fidelización",
  marketplace:"Marketplace",online:"Reservas Online",
  usuarios:"Usuarios & Roles",configuracion:"Configuración"
};
const EMPRESA_DEFAULT={
  nombre:"Jimmy Expression",razonSocial:"Jimmy Rivera S.A.S.",nit:"900.123.456-7",
  direccion:"Pinar del Río Mall, El Poblado",ciudad:"Medellín, Antioquia",
  telefono:"+57 316 447 4596",email:"ventas@jimmyexpression.com",
  web:"jimmyexpression.com",instagram:"@jimmyexpression",
  regimen:"simplificado",ivaServicios:"no",ivaRetail:"19",moneda:"COP",
  numFactura:1,prefijoFactura:"FE",resolucionDian:"",
  mensajeTiquete:"¡Gracias por tu visita! Síguenos en Instagram @jimmyexpression",
  logoEmoji:"✂️",appNombre:"Jimmy Expression Pro",slogan:"New Concept Beauty",
  colorPrincipal:"#C9A84C",
  adminNombre:"Jimmy Rivera",adminEmail:"admin@jimmyexpression.com",adminTel:"+57 316 447 4596",plan:"pro"
};

export default function App(){
  const [tab,setTab]=useState("dashboard");
  const [apts,setApts]=useState(SEED_APTS);
  const [clients,setClients]=useState(SEED_CLIENTS);
  const [svcs,setSvcs]=useState(SEED_SERVICES);
  const [staff,setStaff]=useState(SEED_STAFF);
  const [inv,setInv]=useState(SEED_INVENTORY);
  const [sales,setSales]=useState(SEED_SALES);
  const [products,setProducts]=useState(SEED_PRODUCTS);
  const [orders,setOrders]=useState(SEED_ORDERS);
  const [caja,setCaja]=useState({sesiones:[]});
  const [empresa,setEmpresa]=useState(EMPRESA_DEFAULT);
  const [movimientos,setMovimientos]=useState(SEED_MOVIMIENTOS);
  const [usuarios,setUsuarios]=useState(SEED_USERS);
  const [usuario,setUsuario]=useState(null); // sesión activa
  const [toast,setToast]=useState(null);
  const [cloudStatus,setCloudStatus]=useState("idle");
  const saveTimer=useRef(null);

  // Permisos del usuario activo
  const permisos=usuario?ROLES_CONFIG[usuario.rol]?.permisos||{}:{};
  // Tabs visibles según rol
  const TABS=ALL_TABS.filter(t=>permisos[t.id]!==false);

  // ── CLOUD LOAD ──────────────────────────────────────
  useEffect(()=>{
    (async()=>{
      setCloudStatus("saving");
      try{
        const data=await loadCloud();
        if(data){
          // Only override if cloud has actual data (non-empty arrays)
          if(data.apts && data.apts.length>0) setApts(data.apts);
          if(data.clients && data.clients.length>0) setClients(data.clients);
          if(data.svcs && data.svcs.length>0) setSvcs(data.svcs);
          if(data.staff && data.staff.length>0) setStaff(data.staff);
          if(data.inv && data.inv.length>0) setInv(data.inv);
          if(data.sales && data.sales.length>0) setSales(data.sales);
          if(data.products && data.products.length>0) setProducts(data.products);
          if(data.orders && data.orders.length>0) setOrders(data.orders);
          if(data.caja && Object.keys(data.caja).length>0) setCaja(data.caja);
          if(data.empresa && Object.keys(data.empresa).length>0) setEmpresa(data.empresa);
          if(data.movimientos && data.movimientos.length>0) setMovimientos(data.movimientos);
          if(data.usuarios && data.usuarios.length>0) setUsuarios(data.usuarios);
        }
        // If no cloud data, save the seed data to Supabase immediately
        if(!data || !data.usuarios || data.usuarios.length===0){
          setTimeout(async()=>{
            await saveCloud({
              apts:SEED_APTS, clients:SEED_CLIENTS, svcs:SEED_SERVICES,
              staff:SEED_STAFF, inv:SEED_INVENTORY, sales:SEED_SALES,
              products:SEED_PRODUCTS, orders:SEED_ORDERS,
              caja:{sesiones:[]}, empresa:EMPRESA_DEFAULT,
              movimientos:SEED_MOVIMIENTOS, usuarios:SEED_USERS
            });
          }, 1000);
        }
      }catch(e){console.error(e);}
      setCloudStatus("saved");
    })();
  },[]);

  // ── AUTO-SAVE ────────────────────────────────────────
  // isFirstRender evita guardar en el montaje inicial (evita sobreescribir datos de Supabase)
  const isFirstRender = useRef(true);
  useEffect(()=>{
    if(isFirstRender.current){ isFirstRender.current=false; return; }
    setCloudStatus("saving");
    if(saveTimer.current)clearTimeout(saveTimer.current);
    saveTimer.current=setTimeout(async()=>{
      try{
        await saveCloud({apts,clients,svcs,staff,inv,sales,products,orders,caja,empresa,movimientos,usuarios});
        setCloudStatus("saved");
      }catch(e){setCloudStatus("error");}
    },1400);
  },[apts,clients,svcs,staff,inv,sales,products,orders,caja,empresa,movimientos,usuarios]);

  const showToast=(msg,type="success")=>{setToast({msg,type});setTimeout(()=>setToast(null),3400);};

  const low=inv.filter(i=>i.stock<=i.min).length;
  const pendOnline=apts.filter(a=>a.online&&a.status==="pending").length;
  const pendOrders=orders.filter(o=>o.status==="pending").length;
  const cajaHoy=caja.sesiones?.find(s=>s.fecha===D0(0));
  const cajaAbierta=cajaHoy?.abierta===true;

  const nextFacturaNum=()=>{
    const n=empresa.numFactura||1;
    setEmpresa(p=>({...p,numFactura:n+1}));
    return `${empresa.prefijoFactura||"FE"}-${String(n).padStart(5,"0")}`;
  };

  const cloudColor=cloudStatus==="saving"?C.orange:cloudStatus==="saved"?C.green:C.red;
  const rolActual=usuario?ROLES_CONFIG[usuario.rol]:null;

  // ── LOGIN GUARD ──────────────────────────────────────
  if(!usuario){
    return <LoginScreen usuarios={usuarios} onLogin={(u)=>{setUsuario(u);setTab("dashboard");showToast(`Bienvenido/a, ${u.nombre} 👋`);}} />;
  }

  const cerrarSesion=()=>{setUsuario(null);setTab("dashboard");};

  return(
    <div style={{background:C.bg,minHeight:"100vh",fontFamily:"'Inter','Segoe UI',system-ui,sans-serif",color:C.cream}}>
      {/* ── HEADER ── */}
      <div style={{background:C.surface,borderBottom:`1px solid ${C.border}`,position:"sticky",top:0,zIndex:100}}>
        <div style={{display:"flex",alignItems:"center",gap:10,padding:"0 16px",height:50,borderBottom:`1px solid ${C.border}`}}>
          {/* Logo */}
          <div style={{width:32,height:32,borderRadius:8,background:`linear-gradient(135deg,${empresa.colorPrincipal||C.gold},${C.rose})`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:15,flexShrink:0}}>{empresa.logoEmoji||"✂️"}</div>
          <div style={{lineHeight:1.15,minWidth:0}}>
            <div style={{color:C.cream,fontWeight:800,fontSize:13,letterSpacing:0.5,whiteSpace:"nowrap"}}>{(empresa.appNombre||"JIMMY EXPRESSION").toUpperCase()}</div>
            <div style={{color:C.muted,fontSize:9,letterSpacing:2,textTransform:"uppercase"}}>{empresa.slogan||"New Concept Beauty"}</div>
          </div>
          {/* Alerts */}
          <div style={{marginLeft:"auto",display:"flex",gap:6,alignItems:"center",flexWrap:"nowrap",overflowX:"auto"}}>
            <div onClick={()=>setTab("apertura")} style={{background:cajaAbierta?C.greenD:C.redD,border:`1px solid ${cajaAbierta?C.green:C.red}44`,borderRadius:6,padding:"3px 8px",display:"flex",gap:4,alignItems:"center",cursor:"pointer",flexShrink:0}}>
              <div style={{width:5,height:5,borderRadius:"50%",background:cajaAbierta?C.green:C.red}}/>
              <span style={{color:cajaAbierta?C.green:C.red,fontSize:10,fontWeight:700,whiteSpace:"nowrap"}}>{cajaAbierta?"Caja abierta":"Caja cerrada"}</span>
            </div>
            {pendOnline>0&&<div onClick={()=>setTab("online")} style={{background:C.orangeD,border:`1px solid ${C.orange}44`,borderRadius:6,padding:"3px 8px",cursor:"pointer",flexShrink:0}}><span style={{color:C.orange,fontSize:10,fontWeight:700}}>{pendOnline} online</span></div>}
            {pendOrders>0&&<div onClick={()=>setTab("marketplace")} style={{background:C.blueD,border:`1px solid ${C.blue}44`,borderRadius:6,padding:"3px 8px",cursor:"pointer",flexShrink:0}}><span style={{color:C.blue,fontSize:10,fontWeight:700}}>{pendOrders} pedidos</span></div>}
            {low>0&&<div onClick={()=>setTab("inventario")} style={{background:C.redD,border:`1px solid ${C.red}44`,borderRadius:6,padding:"3px 8px",cursor:"pointer",flexShrink:0}}><span style={{color:C.red,fontSize:10,fontWeight:700}}>{low} stock</span></div>}
            {/* Cloud */}
            <div style={{background:cloudColor+"22",border:`1px solid ${cloudColor}44`,borderRadius:6,padding:"3px 8px",display:"flex",gap:4,alignItems:"center",flexShrink:0}}>
              <div style={{width:5,height:5,borderRadius:"50%",background:cloudColor}}/>
              <span style={{color:cloudColor,fontSize:9,fontWeight:600,whiteSpace:"nowrap"}}>
                {cloudStatus==="saving"?"Guardando":cloudStatus==="saved"?"☁ Nube":"Error"}
              </span>
            </div>
            {/* Usuario activo */}
            <div style={{display:"flex",alignItems:"center",gap:6,background:rolActual?.color+"22",border:`1px solid ${rolActual?.color||C.border}44`,borderRadius:6,padding:"3px 10px",flexShrink:0}}>
              <span style={{fontSize:13}}>{usuario.avatar}</span>
              <div>
                <div style={{color:C.cream,fontSize:10,fontWeight:700,lineHeight:1.2}}>{usuario.nombre.split(" ")[0]}</div>
                <div style={{color:rolActual?.color||C.muted,fontSize:9,lineHeight:1}}>{rolActual?.label}</div>
              </div>
              <button onClick={cerrarSesion} title="Cerrar sesión"
                style={{background:"transparent",border:"none",color:C.muted,fontSize:14,cursor:"pointer",marginLeft:4,padding:0}}>⏏</button>
            </div>
          </div>
        </div>
        {/* NAV */}
        <div style={{display:"flex",overflowX:"auto",scrollbarWidth:"none",padding:"0 2px",msOverflowStyle:"none"}}>
          {TABS.map(t=>(
            <button key={t.id} onClick={()=>setTab(t.id)} style={{
              background:"transparent",border:"none",
              borderBottom:`2px solid ${tab===t.id?C.gold:"transparent"}`,
              color:tab===t.id?C.gold:C.muted,
              padding:"8px 13px",fontSize:11,fontWeight:tab===t.id?700:400,
              cursor:"pointer",whiteSpace:"nowrap",transition:"all .15s",flexShrink:0
            }}>{t.label}</button>
          ))}
        </div>
      </div>

      {/* ── CONTENT ── */}
      <div style={{maxWidth:1140,margin:"0 auto",padding:"20px 16px 80px"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:16}}>
          <h1 style={{color:C.cream,fontSize:18,fontWeight:800,margin:0,letterSpacing:-0.3}}>{TITLES[tab]||tab}</h1>
          <div style={{color:C.muted,fontSize:11}}>{new Date().toLocaleDateString("es-CO",{weekday:"long",day:"numeric",month:"long"})}</div>
        </div>

        {tab==="dashboard"&&<Dashboard apts={apts} sales={sales} clients={clients} inv={inv} svcs={svcs} staff={staff} orders={orders} movimientos={movimientos} empresa={empresa}/>}
        {tab==="agenda"&&<Agenda apts={apts} setApts={setApts} clients={clients} svcs={svcs} staff={staff} toast={showToast} empresa={empresa}/>}
        {tab==="clientes"&&permisos.clientes&&<Clientes clients={clients} setClients={setClients} apts={apts} sales={sales} svcs={svcs} staff={staff} toast={showToast} empresa={empresa}/>}
        {tab==="caja"&&<CajaSection sales={sales} setSales={setSales} apts={apts} clients={clients} svcs={svcs} staff={staff} toast={showToast} empresa={empresa} nextFactura={nextFacturaNum}/>}
        {tab==="apertura"&&<AperturaCierre sales={sales} apts={apts} svcs={svcs} staff={staff} caja={caja} setCaja={setCaja} toast={showToast}/>}
        {tab==="finanzas"&&permisos.finanzas&&<Finanzas movimientos={movimientos} setMovimientos={setMovimientos} sales={sales} staff={staff} apts={apts} svcs={svcs} toast={showToast}/>}
        {tab==="nomina"&&permisos.nomina&&<Nomina staff={staff} setStaff={setStaff} apts={apts} sales={sales} svcs={svcs} toast={showToast}/>}
        {tab==="inventario"&&permisos.inventario&&<Inventario inv={inv} setInv={setInv} toast={showToast}/>}
        {tab==="servicios"&&permisos.servicios&&<Servicios svcs={svcs} setSvcs={setSvcs} staff={staff} toast={showToast}/>}
        {tab==="estadisticas"&&permisos.estadisticas&&<Estadisticas apts={apts} sales={sales} clients={clients} svcs={svcs} staff={staff}/>}
        {tab==="marketing"&&permisos.marketing&&<Marketing clients={clients} toast={showToast}/>}
        {tab==="marketplace"&&permisos.marketplace&&<Marketplace products={products} setProducts={setProducts} orders={orders} setOrders={setOrders} clients={clients} toast={showToast}/>}
        {tab==="online"&&permisos.online&&<CitasOnline svcs={svcs} staff={staff} apts={apts} setApts={setApts} toast={showToast} empresa={empresa} setEmpresa={setEmpresa}/>}
        {tab==="usuarios"&&permisos.usuarios&&<Usuarios usuarios={usuarios} setUsuarios={setUsuarios} toast={showToast}/>}
        {tab==="configuracion"&&permisos.configuracion&&<Configuracion empresa={empresa} setEmpresa={setEmpresa} toast={showToast}/>}

        {/* Acceso denegado */}
        {!permisos[tab]&&tab!=="dashboard"&&tab!=="agenda"&&tab!=="caja"&&tab!=="apertura"&&(
          <div style={{...sx.card,padding:40,textAlign:"center",border:`1px solid ${C.red}44`}}>
            <div style={{fontSize:48,marginBottom:12}}>🚫</div>
            <div style={{color:C.red,fontWeight:700,fontSize:18,marginBottom:6}}>Acceso denegado</div>
            <div style={{color:C.muted,fontSize:13}}>Tu rol de <b style={{color:rolActual?.color}}>{rolActual?.label}</b> no tiene permiso para acceder a esta sección.</div>
          </div>
        )}
      </div>

      {toast&&<Toast msg={toast.msg} type={toast.type}/>}
    </div>
  );
}

