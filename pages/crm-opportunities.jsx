// ── NexusCRM · Oportunidades ─────────────────────────────────
function Badge({color,children}){const c={blue:'bg-blue-100 text-blue-700',green:'bg-green-100 text-green-700',red:'bg-red-100 text-red-700',yellow:'bg-yellow-100 text-yellow-700',orange:'bg-orange-100 text-orange-700',purple:'bg-purple-100 text-purple-700',gray:'bg-slate-100 text-slate-600',navy:'bg-blue-50 text-blue-900',gold:'bg-amber-100 text-amber-800'};return<span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold whitespace-nowrap ${c[color]??c.gray}`}>{children}</span>;}
function Avatar({initials,gradient,size='sm'}){const s={sm:'w-7 h-7 text-[10px]',md:'w-10 h-10 text-sm',lg:'w-12 h-12 text-base'};return<div className={`${s[size]} rounded-full flex items-center justify-center font-bold text-white flex-shrink-0`}style={{background:gradient??'linear-gradient(135deg,#1a3d6b,#2563a8)'}}>{initials}</div>;}
function IcoSearch(){return<svg width="14"height="14"viewBox="0 0 24 24"fill="none"stroke="currentColor"strokeWidth="2"><circle cx="11"cy="11"r="8"/><line x1="21"y1="21"x2="16.65"y2="16.65"/></svg>}
function IcoPlus(){return<svg width="14"height="14"viewBox="0 0 24 24"fill="none"stroke="currentColor"strokeWidth="2.5"><line x1="12"y1="5"x2="12"y2="19"/><line x1="5"y1="12"x2="19"y2="12"/></svg>}
function IcoBell(){return<svg width="16"height="16"viewBox="0 0 24 24"fill="none"stroke="currentColor"strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>}
function IcoSettings(){return<svg width="15"height="15"viewBox="0 0 24 24"fill="none"stroke="currentColor"strokeWidth="2"><circle cx="12"cy="12"r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>}
function IcoCalendar(){return<svg width="13"height="13"viewBox="0 0 24 24"fill="none"stroke="currentColor"strokeWidth="2"><rect x="3"y="4"width="18"height="18"rx="2"/><line x1="16"y1="2"x2="16"y2="6"/><line x1="8"y1="2"x2="8"y2="6"/><line x1="3"y1="10"x2="21"y2="10"/></svg>}

const NAV=[
  {g:'Principal',      items:[{l:'Dashboard',a:false,b:null,ico:'📊'}]},
  {g:'Ventas & CRM',   items:[{l:'Contactos',a:false,b:null,ico:'👤'},{l:'Cuentas',a:false,b:null,ico:'🏢'},{l:'Leads',a:false,b:'12',ico:'🎯'},{l:'Oportunidades',a:true,b:null,ico:'💼'},{l:'Actividades',a:false,b:'5',ico:'✅'},{l:'Calendario',a:false,b:null,ico:'📅'}]},
  {g:'Comercial',      items:[{l:'Productos',a:false,b:null,ico:'📦'},{l:'Cotizaciones',a:false,b:'3',ico:'📋'},{l:'Facturas',a:false,b:null,ico:'🧾'}]},
  {g:'Marketing',      items:[{l:'Campañas',a:false,b:null,ico:'📣'}]},
  {g:'Soporte',        items:[{l:'Tickets',a:false,b:'8',ico:'🎫'},{l:'Documentos',a:false,b:null,ico:'📁'}]},
  {g:'Análisis',       items:[{l:'Reportes',a:false,b:null,ico:'📈'}]},
  {g:'Administración', items:[{l:'Equipo',a:false,b:null,ico:'👥'},{l:'Configuración',a:false,b:null,ico:'⚙️'}]},
];
function Sidebar(){return(<aside className="w-[260px] min-h-screen bg-[#0f2240] text-slate-400 flex flex-col flex-shrink-0"><div className="px-5 py-5 border-b border-white/[0.08]"><div className="flex items-center gap-2.5"><div className="w-[34px] h-[34px] rounded-[8px] flex items-center justify-center font-bold text-white"style={{background:'linear-gradient(135deg,#2563a8,#c8a558)'}}>N</div><div><div className="text-[17px] font-bold text-white tracking-[-0.4px]">NexusCRM</div><div className="text-[10px] text-[#c8a558] font-semibold tracking-widest uppercase">Enterprise Suite</div></div></div></div><nav className="flex-1 py-2 overflow-y-auto">{NAV.map(g=>(<div key={g.g}><div className="px-5 pt-4 pb-1.5 text-[10px] font-semibold tracking-[0.1em] uppercase text-slate-600">{g.g}</div>{g.items.map(item=>(<a key={item.l} href="#"className={`flex items-center gap-2.5 px-5 py-[9px] text-[13px] font-medium transition-colors ${item.a?'bg-[rgba(37,99,168,0.35)] text-white border-r-[3px] border-[#c8a558]':'text-slate-400 hover:bg-white/[0.06] hover:text-slate-200'}`}><span>{item.ico}</span><span>{item.l}</span>{item.b&&<span className="ml-auto bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center">{item.b}</span>}</a>))}</div>))}</nav><div className="px-5 py-4 border-t border-white/[0.08]"><div className="flex items-center gap-2.5"><Avatar initials="JM" gradient="linear-gradient(135deg,#c8a558,#a8873a)" size="md"/><div><div className="text-[12px] font-semibold text-slate-200">Juan Martínez</div><div className="text-[11px] text-slate-500">Administrador</div></div><button className="ml-auto text-slate-500"><IcoSettings/></button></div></div></aside>);}
function Header({title}){return(<header className="h-16 bg-white border-b border-slate-200 flex items-center px-6 gap-4 sticky top-0 z-40"><div className="flex items-center gap-1.5 text-[13px] flex-1"><span className="text-[#2563a8] font-medium">NexusCRM</span><span className="text-slate-300">›</span><span className="text-slate-700 font-semibold">{title}</span></div><div className="relative max-w-[280px] w-full"><span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"><IcoSearch/></span><input readOnly placeholder="Buscar oportunidades…"className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-[13px] bg-slate-50"/></div><div className="flex items-center gap-2"><button className="relative w-9 h-9 flex items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100"><IcoBell/><span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"/></button><Avatar initials="JM" gradient="linear-gradient(135deg,#c8a558,#a8873a)" size="md"/></div></header>);}
function KPI({label,value,color,bg,icon,sub}){return(<div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm relative overflow-hidden"style={{borderTop:`3px solid ${color}`}}><div className="absolute top-4 right-4 w-9 h-9 rounded-lg flex items-center justify-center text-base"style={{background:bg}}>{icon}</div><div className="text-[26px] font-bold text-slate-800 leading-tight">{value}</div><div className="text-[12px] text-slate-500 font-medium mt-1">{label}</div>{sub&&<div className="text-[11px] text-green-600 font-semibold mt-1">{sub}</div>}</div>);}

const kanban=[
  {title:'Prospección',color:'#0284c7',bg:'#dbeafe',total:'$28,400',pct:30,cards:[
    {t:'Licencia ERP anual',co:'Tecno S.A.',val:'$12,000',prob:20,days:3,owner:'JM'},
    {t:'Consultoría cloud',co:'NetSol',val:'$8,400',prob:15,days:7,owner:'RP'},
    {t:'Soporte premium 2026',co:'DataPoint',val:'$8,000',prob:25,days:1,owner:'CG'},
  ]},
  {title:'Calificación',color:'#7c3aed',bg:'#f3e8ff',total:'$45,200',pct:45,cards:[
    {t:'Suite Analytics',co:'Global Corp',val:'$18,700',prob:40,days:4,owner:'JM'},
    {t:'Migración a la nube',co:'MegaTrade',val:'$26,500',prob:45,days:2,owner:'CG'},
  ]},
  {title:'Propuesta',color:'#c8a558',bg:'#fef9c3',total:'$63,100',pct:60,cards:[
    {t:'Módulo de reportes',co:'Global Corp',val:'$24,600',prob:55,days:5,owner:'JM'},
    {t:'Integración CRM-ERP',co:'MegaTrade',val:'$38,500',prob:60,days:2,owner:'RP'},
  ]},
  {title:'Negociación',color:'#d97706',bg:'#ffedd5',total:'$72,800',pct:75,cards:[
    {t:'Plataforma e-commerce',co:'Tecno S.A.',val:'$42,000',prob:72,days:4,owner:'JM'},
    {t:'Rediseño portal cliente',co:'Innova LLC',val:'$30,800',prob:78,days:6,owner:'CG'},
  ]},
  {title:'Cierre',color:'#16a34a',bg:'#dcfce7',total:'$39,000',pct:90,cards:[
    {t:'Licencia anual corporativa',co:'Global Corp',val:'$39,000',prob:90,days:1,owner:'JM'},
  ]},
];

function KanbanCard({c}){
  return(
    <div className="bg-white border border-slate-200 rounded-lg p-3.5 cursor-pointer hover:shadow-md transition-shadow">
      <div className="text-[12px] font-semibold text-slate-800 mb-1">{c.t}</div>
      <div className="text-[11px] text-slate-500 mb-2">{c.co}</div>
      <div className="h-1 bg-slate-100 rounded-full mb-2.5">
        <div className="h-full rounded-full bg-[#c8a558]"style={{width:`${c.prob}%`}}/>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-[12px] font-bold text-slate-700">{c.val}</span>
        <div className="flex items-center gap-1.5">
          <div className="flex items-center gap-0.5 text-[11px] text-slate-400"><IcoCalendar/>{c.days}d</div>
          <Avatar initials={c.owner} gradient="linear-gradient(135deg,#1a3d6b,#2563a8)" size="sm"/>
        </div>
      </div>
    </div>
  );
}

function OportPage(){
  return(
    <main className="flex-1 overflow-y-auto bg-slate-50">
      <div className="px-7 py-6 flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <div><h1 className="text-[24px] font-bold text-slate-900 tracking-[-0.5px]">Oportunidades</h1><p className="text-[13px] text-slate-500 mt-0.5">91 oportunidades · Pipeline total: $248,500</p></div>
          <div className="flex gap-2">
            <button className="flex items-center gap-2 bg-white border border-slate-200 text-slate-600 text-[13px] font-medium px-3.5 py-2 rounded-lg">📋 Lista</button>
            <button className="flex items-center gap-2 bg-white border border-[#1a3d6b] text-[#1a3d6b] text-[13px] font-semibold px-3.5 py-2 rounded-lg">📌 Tablero</button>
            <button className="flex items-center gap-2 bg-[#1a3d6b] text-white text-[13px] font-semibold px-3.5 py-2 rounded-lg"><IcoPlus/>Nueva oportunidad</button>
          </div>
        </div>

        <div className="grid grid-cols-5 gap-4">
          <KPI label="Total pipeline"  value="$248K"  color="#2563a8" bg="#dbeafe" icon="💼" sub="↑ 4.7% vs mes ant."/>
          <KPI label="Cerradas ganadas"value="$82K"   color="#16a34a" bg="#dcfce7" icon="🏆" sub="↑ 21.4%"/>
          <KPI label="En negociación"  value="11"     color="#d97706" bg="#ffedd5" icon="🤝" sub="$72,800 total"/>
          <KPI label="Tasa de ganancia"value="38%"    color="#7c3aed" bg="#f3e8ff" icon="📊" sub="↑ 3%"/>
          <KPI label="Ciclo promedio"  value="24d"    color="#c8a558" bg="#fef9c3" icon="📅" sub="↓ 2d mejor"/>
        </div>

        {/* Pipeline summary bars */}
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-5">
          <div className="flex items-center justify-between mb-4"><h3 className="text-[14px] font-bold text-slate-800">Resumen por Etapa</h3><span className="text-[12px] text-slate-400">Valor total: $248,500</span></div>
          <div className="flex gap-1 h-8 rounded-lg overflow-hidden">
            {kanban.map(k=>(<div key={k.title} style={{flex:parseInt(k.total.replace(/\D/g,'')),background:k.color}} className="flex items-center justify-center text-white text-[10px] font-bold" title={`${k.title}: ${k.total}`}>{k.title.slice(0,4)}</div>))}
          </div>
          <div className="flex gap-4 mt-2 flex-wrap">
            {kanban.map(k=>(<div key={k.title} className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full"style={{background:k.color}}/><span className="text-[12px] text-slate-600">{k.title}</span><span className="text-[12px] font-bold text-slate-800">{k.total}</span></div>))}
          </div>
        </div>

        {/* Kanban */}
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
            <h3 className="text-[14px] font-bold text-slate-800">Vista Kanban</h3>
            <select className="py-1.5 px-3 border border-slate-200 rounded-lg text-[12px] text-slate-600 bg-slate-50"><option>Todos los asignados</option><option>JM</option><option>RP</option><option>CG</option></select>
          </div>
          <div className="p-4 flex gap-3 overflow-x-auto">
            {kanban.map(col=>(
              <div key={col.title} className="min-w-[220px] flex-shrink-0">
                <div className="rounded-t-lg px-3 py-2.5 flex items-center justify-between border border-slate-200 border-b-0"style={{background:col.bg}}>
                  <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full"style={{background:col.color}}/><span className="text-[12px] font-bold"style={{color:col.color}}>{col.title}</span></div>
                  <span className="text-[11px] font-bold text-slate-600">{col.total}</span>
                </div>
                <div className="bg-slate-50 border border-slate-200 border-t-0 rounded-b-lg p-2 flex flex-col gap-2 min-h-[100px]">
                  {col.cards.map(card=>(<KanbanCard key={card.t} c={card}/>))}
                  <button className="flex items-center gap-1.5 text-[11px] text-slate-400 hover:text-slate-600 py-1 px-2 hover:bg-white rounded-md transition-colors w-full"><IcoPlus/>Agregar oportunidad</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

export default function Container(){
  return(
    <div className="flex bg-slate-50 font-['Inter',sans-serif]"style={{width:1493,minHeight:900}}tabIndex="-1">
      <Sidebar/><div className="flex flex-col flex-1 min-w-0"><Header title="Oportunidades"/><OportPage/></div>
    </div>
  );
}
