// ── NexusCRM · Reportes ──────────────────────────────────────
function Avatar({initials,gradient,size='sm'}){const s={sm:'w-8 h-8 text-xs',md:'w-10 h-10 text-sm'};return<div className={`${s[size]} rounded-full flex items-center justify-center font-bold text-white flex-shrink-0`}style={{background:gradient??'linear-gradient(135deg,#1a3d6b,#2563a8)'}}>{initials}</div>;}
function IcoSearch(){return<svg width="14"height="14"viewBox="0 0 24 24"fill="none"stroke="currentColor"strokeWidth="2"><circle cx="11"cy="11"r="8"/><line x1="21"y1="21"x2="16.65"y2="16.65"/></svg>}
function IcoPlus(){return<svg width="14"height="14"viewBox="0 0 24 24"fill="none"stroke="currentColor"strokeWidth="2.5"><line x1="12"y1="5"x2="12"y2="19"/><line x1="5"y1="12"x2="19"y2="12"/></svg>}
function IcoBell(){return<svg width="16"height="16"viewBox="0 0 24 24"fill="none"stroke="currentColor"strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>}
function IcoSettings(){return<svg width="15"height="15"viewBox="0 0 24 24"fill="none"stroke="currentColor"strokeWidth="2"><circle cx="12"cy="12"r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>}
function IcoDownload(){return<svg width="14"height="14"viewBox="0 0 24 24"fill="none"stroke="currentColor"strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12"y1="15"x2="12"y2="3"/></svg>}
function IcoTrend(){return<svg width="14"height="14"viewBox="0 0 24 24"fill="none"stroke="currentColor"strokeWidth="2"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>}

const NAV=[
  {g:'Principal',      items:[{l:'Dashboard',a:false,b:null,ico:'📊'}]},
  {g:'Ventas & CRM',   items:[{l:'Contactos',a:false,b:null,ico:'👤'},{l:'Cuentas',a:false,b:null,ico:'🏢'},{l:'Leads',a:false,b:'12',ico:'🎯'},{l:'Oportunidades',a:false,b:null,ico:'💼'},{l:'Actividades',a:false,b:'5',ico:'✅'},{l:'Calendario',a:false,b:null,ico:'📅'}]},
  {g:'Comercial',      items:[{l:'Productos',a:false,b:null,ico:'📦'},{l:'Cotizaciones',a:false,b:'3',ico:'📋'},{l:'Facturas',a:false,b:null,ico:'🧾'}]},
  {g:'Marketing',      items:[{l:'Campañas',a:false,b:null,ico:'📣'}]},
  {g:'Soporte',        items:[{l:'Tickets',a:false,b:'8',ico:'🎫'},{l:'Documentos',a:false,b:null,ico:'📁'}]},
  {g:'Análisis',       items:[{l:'Reportes',a:true,b:null,ico:'📈'}]},
  {g:'Administración', items:[{l:'Equipo',a:false,b:null,ico:'👥'},{l:'Configuración',a:false,b:null,ico:'⚙️'}]},
];
function Sidebar(){return(<aside className="w-[260px] min-h-screen bg-[#0f2240] text-slate-400 flex flex-col flex-shrink-0"><div className="px-5 py-5 border-b border-white/[0.08]"><div className="flex items-center gap-2.5"><div className="w-[34px] h-[34px] rounded-[8px] flex items-center justify-center font-bold text-white"style={{background:'linear-gradient(135deg,#2563a8,#c8a558)'}}>N</div><div><div className="text-[17px] font-bold text-white tracking-[-0.4px]">NexusCRM</div><div className="text-[10px] text-[#c8a558] font-semibold tracking-widest uppercase">Enterprise Suite</div></div></div></div><nav className="flex-1 py-2 overflow-y-auto">{NAV.map(g=>(<div key={g.g}><div className="px-5 pt-4 pb-1.5 text-[10px] font-semibold tracking-[0.1em] uppercase text-slate-600">{g.g}</div>{g.items.map(item=>(<a key={item.l} href="#"className={`flex items-center gap-2.5 px-5 py-[9px] text-[13px] font-medium transition-colors ${item.a?'bg-[rgba(37,99,168,0.35)] text-white border-r-[3px] border-[#c8a558]':'text-slate-400 hover:bg-white/[0.06] hover:text-slate-200'}`}><span>{item.ico}</span><span>{item.l}</span>{item.b&&<span className="ml-auto bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center">{item.b}</span>}</a>))}</div>))}</nav><div className="px-5 py-4 border-t border-white/[0.08]"><div className="flex items-center gap-2.5"><Avatar initials="JM" gradient="linear-gradient(135deg,#c8a558,#a8873a)"/><div><div className="text-[12px] font-semibold text-slate-200">Juan Martínez</div><div className="text-[11px] text-slate-500">Administrador</div></div><button className="ml-auto text-slate-500"><IcoSettings/></button></div></div></aside>);}
function Header({title}){return(<header className="h-16 bg-white border-b border-slate-200 flex items-center px-6 gap-4 sticky top-0 z-40"><div className="flex items-center gap-1.5 text-[13px] flex-1"><span className="text-[#2563a8] font-medium">NexusCRM</span><span className="text-slate-300">›</span><span className="text-slate-700 font-semibold">{title}</span></div><div className="relative max-w-[280px] w-full"><span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"><IcoSearch/></span><input readOnly placeholder="Buscar reportes…"className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-[13px] bg-slate-50"/></div><div className="flex items-center gap-2"><button className="relative w-9 h-9 flex items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100"><IcoBell/><span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"/></button><Avatar initials="JM" gradient="linear-gradient(135deg,#c8a558,#a8873a)"/></div></header>);}
function KPI({label,value,color,bg,icon,change}){return(<div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm relative overflow-hidden"style={{borderTop:`3px solid ${color}`}}><div className="absolute top-4 right-4 w-9 h-9 rounded-lg flex items-center justify-center text-base"style={{background:bg}}>{icon}</div><div className="text-[26px] font-bold text-slate-800 leading-tight">{value}</div><div className="text-[12px] text-slate-500 font-medium mt-1">{label}</div>{change&&<div className={`text-[11px] font-semibold mt-1 flex items-center gap-1 ${change.startsWith('+')?'text-green-600':'text-red-600'}`}><IcoTrend/>{change} vs mes ant.</div>}</div>);}

// Monthly revenue bars (mock data)
const months=['Sep','Oct','Nov','Dic','Ene','Feb','Mar'];
const revenue=[62,71,58,94,88,82,97];
const deals=   [14,17,12,21,19,18,22];
const maxRev=Math.max(...revenue);

const piStages=[
  {l:'Prospección', v:28,color:'#0284c7'},
  {l:'Calificación',v:45,color:'#7c3aed'},
  {l:'Propuesta',   v:63,color:'#c8a558'},
  {l:'Negociación', v:73,color:'#d97706'},
  {l:'Cierre',      v:39,color:'#16a34a'},
];

const topReps=[
  {n:'Juan Martínez',r:'JM',deals:9,rev:'$48K',rate:'72%',g:'linear-gradient(135deg,#c8a558,#a8873a)'},
  {n:'Roberto Pérez', r:'RP',deals:7,rev:'$36K',rate:'58%',g:'linear-gradient(135deg,#2563a8,#1a3d6b)'},
  {n:'Carmen García', r:'CG',deals:6,rev:'$29K',rate:'50%',g:'linear-gradient(135deg,#7c3aed,#5b21b6)'},
];

function ReportsPage(){
  return(
    <main className="flex-1 overflow-y-auto bg-slate-50">
      <div className="px-7 py-6 flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <div><h1 className="text-[24px] font-bold text-slate-900 tracking-[-0.5px]">Reportes & Analíticas</h1><p className="text-[13px] text-slate-500 mt-0.5">Datos en tiempo real · Último cierre: 13 Mar 2026</p></div>
          <div className="flex gap-2">
            <select className="py-2 px-3 border border-slate-200 rounded-lg text-[13px] bg-white text-slate-600"><option>Últimos 6 meses</option><option>Este mes</option><option>Este trimestre</option><option>Este año</option></select>
            <button className="flex items-center gap-2 bg-white border border-slate-200 text-slate-600 text-[13px] font-medium px-3.5 py-2 rounded-lg"><IcoDownload/>Exportar</button>
            <button className="flex items-center gap-2 bg-[#1a3d6b] text-white text-[13px] font-semibold px-3.5 py-2 rounded-lg"><IcoPlus/>Nuevo reporte</button>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4">
          <KPI label="Ingresos totales"  value="$550K" color="#2563a8" bg="#dbeafe" icon="💰" change="+21.4%"/>
          <KPI label="Tratos cerrados"   value="113"   color="#16a34a" bg="#dcfce7" icon="🏆" change="+8.2%"/>
          <KPI label="Tasa conversión"   value="38.4%" color="#c8a558" bg="#fef9c3" icon="📊" change="+3.1%"/>
          <KPI label="Ciclo promedio"    value="24d"   color="#7c3aed" bg="#f3e8ff" icon="⏱" change="-2.1d"/>
        </div>

        <div className="grid grid-cols-3 gap-5">
          {/* Revenue bar chart */}
          <div className="col-span-2 bg-white border border-slate-200 rounded-xl shadow-sm p-5">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-[14px] font-bold text-slate-800">Ingresos Mensuales (USD k)</h3>
              <div className="flex gap-3">
                <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-sm bg-[#1a3d6b]"/><span className="text-[11px] text-slate-500">Ingresos</span></div>
                <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-sm bg-[#c8a558]"/><span className="text-[11px] text-slate-500">Tratos cerrados</span></div>
              </div>
            </div>
            <div className="flex items-end gap-3 h-[160px]">
              {months.map((m,i)=>(
                <div key={m} className="flex-1 flex flex-col items-center gap-1">
                  <div className="w-full flex gap-1 items-end"style={{height:'140px'}}>
                    <div className="flex-1 rounded-t-md transition-all"style={{height:`${(revenue[i]/maxRev)*130}px`,background:i===months.length-1?'#1a3d6b':'#dbeafe'}}/>
                    <div className="flex-1 rounded-t-md transition-all"style={{height:`${(deals[i]/25)*130}px`,background:i===months.length-1?'#c8a558':'#fef9c3'}}/>
                  </div>
                  <span className="text-[11px] text-slate-400 font-medium">{m}</span>
                  <span className="text-[11px] font-bold text-slate-600">${revenue[i]}K</span>
                </div>
              ))}
            </div>
          </div>

          {/* Pipeline by stage */}
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-5">
            <h3 className="text-[14px] font-bold text-slate-800 mb-4">Pipeline por Etapa ($K)</h3>
            <div className="flex flex-col gap-3">
              {piStages.map(ps=>(
                <div key={ps.l}>
                  <div className="flex items-center justify-between mb-1"><span className="text-[12px] font-medium text-slate-600">{ps.l}</span><span className="text-[12px] font-bold text-slate-700">${ps.v}K</span></div>
                  <div className="h-2.5 bg-slate-100 rounded-full"><div className="h-full rounded-full"style={{width:`${(ps.v/73)*100}%`,background:ps.color}}/></div>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100">
              <div className="text-[11px] text-slate-400">Total pipeline</div>
              <div className="text-[20px] font-bold text-slate-800">$248K</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-5">
          {/* Top reps */}
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-5">
            <h3 className="text-[14px] font-bold text-slate-800 mb-4">Top Vendedores · Marzo</h3>
            {topReps.map((r,i)=>(
              <div key={i} className="flex items-center gap-3 mb-3 pb-3 border-b border-slate-50 last:border-0 last:mb-0 last:pb-0">
                <span className="text-[18px] font-black text-slate-200 w-6 text-center">{i+1}</span>
                <Avatar initials={r.r} gradient={r.g}/>
                <div className="flex-1 min-w-0">
                  <div className="text-[12px] font-bold text-slate-800">{r.n}</div>
                  <div className="text-[11px] text-slate-400">{r.deals} tratos · {r.rev}</div>
                </div>
                <div className="text-[13px] font-bold text-green-600">{r.rate}</div>
              </div>
            ))}
          </div>

          {/* Leads by source */}
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-5">
            <h3 className="text-[14px] font-bold text-slate-800 mb-4">Leads por Fuente</h3>
            {[{l:'Email Campaign',v:32,c:'#2563a8'},{l:'LinkedIn',v:24,c:'#0e76a8'},{l:'Referidos',v:20,c:'#16a34a'},{l:'Website',v:15,c:'#c8a558'},{l:'Otros',v:9,c:'#94a3b8'}].map(s=>(
              <div key={s.l} className="flex items-center gap-2.5 mb-3">
                <div className="w-2.5 h-2.5 rounded-full flex-shrink-0"style={{background:s.c}}/>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1"><span className="text-[12px] text-slate-600">{s.l}</span><span className="text-[12px] font-bold text-slate-700">{s.v}%</span></div>
                  <div className="h-1.5 bg-slate-100 rounded-full"><div className="h-full rounded-full"style={{width:`${s.v}%`,background:s.c}}/></div>
                </div>
              </div>
            ))}
          </div>

          {/* Quick metrics */}
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-5">
            <h3 className="text-[14px] font-bold text-slate-800 mb-4">Métricas Rápidas</h3>
            <div className="flex flex-col gap-3">
              {[
                {l:'Valor promedio trato','v':'$8,750',c:'text-blue-600'},
                {l:'Leads nuevos este mes','v':'47',c:'text-green-600'},
                {l:'Actividades completadas','v':'31',c:'text-amber-600'},
                {l:'Tickets resueltos','v':'18',c:'text-purple-600'},
                {l:'NPS clientes','v':'72',c:'text-green-600'},
                {l:'Retención anual','v':'91%',c:'text-blue-600'},
              ].map(m=>(
                <div key={m.l} className="flex items-center justify-between py-2 border-b border-slate-50 last:border-0">
                  <span className="text-[12px] text-slate-600">{m.l}</span>
                  <span className={`text-[14px] font-bold ${m.c}`}>{m.v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default function Container(){
  return(
    <div className="flex bg-slate-50 font-['Inter',sans-serif]"style={{width:1493,minHeight:900}}tabIndex="-1">
      <Sidebar/><div className="flex flex-col flex-1 min-w-0"><Header title="Reportes"/><ReportsPage/></div>
    </div>
  );
}
