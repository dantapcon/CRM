// ── NexusCRM · Leads ─────────────────────────────────────────
function Badge({color,children}){const c={blue:'bg-blue-100 text-blue-700',green:'bg-green-100 text-green-700',red:'bg-red-100 text-red-700',yellow:'bg-yellow-100 text-yellow-700',orange:'bg-orange-100 text-orange-700',purple:'bg-purple-100 text-purple-700',gray:'bg-slate-100 text-slate-600',navy:'bg-blue-50 text-blue-900',gold:'bg-amber-100 text-amber-800'};return<span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold whitespace-nowrap ${c[color]??c.gray}`}>{children}</span>;}
function Avatar({initials,gradient,size='sm'}){const s={sm:'w-8 h-8 text-xs',md:'w-10 h-10 text-sm',lg:'w-12 h-12 text-base'};return<div className={`${s[size]} rounded-full flex items-center justify-center font-bold text-white flex-shrink-0`}style={{background:gradient??'linear-gradient(135deg,#1a3d6b,#2563a8)'}}>{initials}</div>;}
function ProgressBar({pct,color='#2563a8'}){return<div className="h-1.5 bg-slate-100 rounded-full overflow-hidden"><div className="h-full rounded-full"style={{width:`${pct}%`,background:color}}/></div>;}
function IcoSearch(){return<svg width="14"height="14"viewBox="0 0 24 24"fill="none"stroke="currentColor"strokeWidth="2"><circle cx="11"cy="11"r="8"/><line x1="21"y1="21"x2="16.65"y2="16.65"/></svg>}
function IcoPlus(){return<svg width="14"height="14"viewBox="0 0 24 24"fill="none"stroke="currentColor"strokeWidth="2.5"><line x1="12"y1="5"x2="12"y2="19"/><line x1="5"y1="12"x2="19"y2="12"/></svg>}
function IcoMore(){return<svg width="15"height="15"viewBox="0 0 24 24"fill="none"stroke="currentColor"strokeWidth="2"><circle cx="5"cy="12"r="1"/><circle cx="12"cy="12"r="1"/><circle cx="19"cy="12"r="1"/></svg>}
function IcoBell(){return<svg width="16"height="16"viewBox="0 0 24 24"fill="none"stroke="currentColor"strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>}
function IcoSettings(){return<svg width="15"height="15"viewBox="0 0 24 24"fill="none"stroke="currentColor"strokeWidth="2"><circle cx="12"cy="12"r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>}

const NAV=[
  {g:'Principal',      items:[{l:'Dashboard',a:false,b:null,ico:'📊'}]},
  {g:'Ventas & CRM',   items:[{l:'Contactos',a:false,b:null,ico:'👤'},{l:'Cuentas',a:false,b:null,ico:'🏢'},{l:'Leads',a:true,b:'12',ico:'🎯'},{l:'Oportunidades',a:false,b:null,ico:'💼'},{l:'Actividades',a:false,b:'5',ico:'✅'},{l:'Calendario',a:false,b:null,ico:'📅'}]},
  {g:'Comercial',      items:[{l:'Productos',a:false,b:null,ico:'📦'},{l:'Cotizaciones',a:false,b:'3',ico:'📋'},{l:'Facturas',a:false,b:null,ico:'🧾'}]},
  {g:'Marketing',      items:[{l:'Campañas',a:false,b:null,ico:'📣'}]},
  {g:'Soporte',        items:[{l:'Tickets',a:false,b:'8',ico:'🎫'},{l:'Documentos',a:false,b:null,ico:'📁'}]},
  {g:'Análisis',       items:[{l:'Reportes',a:false,b:null,ico:'📈'}]},
  {g:'Administración', items:[{l:'Equipo',a:false,b:null,ico:'👥'},{l:'Configuración',a:false,b:null,ico:'⚙️'}]},
];
function Sidebar(){return(<aside className="w-[260px] min-h-screen bg-[#0f2240] text-slate-400 flex flex-col flex-shrink-0"><div className="px-5 py-5 border-b border-white/[0.08]"><div className="flex items-center gap-2.5"><div className="w-[34px] h-[34px] rounded-[8px] flex items-center justify-center font-bold text-white"style={{background:'linear-gradient(135deg,#2563a8,#c8a558)'}}>N</div><div><div className="text-[17px] font-bold text-white tracking-[-0.4px]">NexusCRM</div><div className="text-[10px] text-[#c8a558] font-semibold tracking-widest uppercase">Enterprise Suite</div></div></div></div><nav className="flex-1 py-2 overflow-y-auto">{NAV.map(g=>(<div key={g.g}><div className="px-5 pt-4 pb-1.5 text-[10px] font-semibold tracking-[0.1em] uppercase text-slate-600">{g.g}</div>{g.items.map(item=>(<a key={item.l} href="#"className={`flex items-center gap-2.5 px-5 py-[9px] text-[13px] font-medium transition-colors ${item.a?'bg-[rgba(37,99,168,0.35)] text-white border-r-[3px] border-[#c8a558]':'text-slate-400 hover:bg-white/[0.06] hover:text-slate-200'}`}><span>{item.ico}</span><span>{item.l}</span>{item.b&&<span className="ml-auto bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center">{item.b}</span>}</a>))}</div>))}</nav><div className="px-5 py-4 border-t border-white/[0.08]"><div className="flex items-center gap-2.5"><Avatar initials="JM" gradient="linear-gradient(135deg,#c8a558,#a8873a)"/><div><div className="text-[12px] font-semibold text-slate-200">Juan Martínez</div><div className="text-[11px] text-slate-500">Administrador</div></div><button className="ml-auto text-slate-500"><IcoSettings/></button></div></div></aside>);}
function Header({title}){return(<header className="h-16 bg-white border-b border-slate-200 flex items-center px-6 gap-4 sticky top-0 z-40"><div className="flex items-center gap-1.5 text-[13px] flex-1"><span className="text-[#2563a8] font-medium">NexusCRM</span><span className="text-slate-300">›</span><span className="text-slate-700 font-semibold">{title}</span></div><div className="relative max-w-[280px] w-full"><span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"><IcoSearch/></span><input readOnly placeholder={`Buscar ${title.toLowerCase()}…`}className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-[13px] bg-slate-50"/></div><div className="flex items-center gap-2"><button className="relative w-9 h-9 flex items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100"><IcoBell/><span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"/></button><Avatar initials="JM" gradient="linear-gradient(135deg,#c8a558,#a8873a)"/></div></header>);}
function KPI({label,value,color,bg,icon,sub}){return(<div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm relative overflow-hidden"style={{borderTop:`3px solid ${color}`}}><div className="absolute top-4 right-4 w-9 h-9 rounded-lg flex items-center justify-center text-base"style={{background:bg}}>{icon}</div><div className="text-[26px] font-bold text-slate-800 leading-tight">{value}</div><div className="text-[12px] text-slate-500 font-medium mt-1">{label}</div>{sub&&<div className="text-[11px] text-green-600 font-semibold mt-1">{sub}</div>}</div>);}

const leads=[
  {name:'Carlos Ruiz',    co:'Tecno S.A.',   source:'Sitio Web', stage:'Calificado',   sc:'blue',  score:87, assigned:'JM', date:'Hoy',   val:'$24,000'},
  {name:'Ana López',      co:'Innova LLC',   source:'LinkedIn',  stage:'Nuevo',        sc:'navy',  score:62, assigned:'RP', date:'Ayer',  val:'$8,500'},
  {name:'Pedro Vargas',   co:'GlobalNet',    source:'Referido',  stage:'Contactado',   sc:'purple',score:74, assigned:'CG', date:'Hace 2d',val:'$15,200'},
  {name:'María Fernández',co:'DataPoint',    source:'Email',     stage:'Negociación',  sc:'gold',  score:91, assigned:'JM', date:'Hoy',   val:'$42,000'},
  {name:'Luis Torres',    co:'MegaTrade',    source:'Llamada',   stage:'Descartado',   sc:'gray',  score:23, assigned:'RP', date:'Hace 5d',val:'—'},
  {name:'Sofía Méndez',   co:'NetSol',       source:'Sitio Web', stage:'Calificado',   sc:'blue',  score:78, assigned:'CG', date:'Hace 1d',val:'$19,800'},
  {name:'Roberto Gómez',  co:'TechPlus',     source:'Evento',    stage:'Nuevo',        sc:'navy',  score:55, assigned:'JM', date:'Hoy',   val:'$6,000'},
  {name:'Laura Jiménez',  co:'Alpha Corp',   source:'Referido',  stage:'Propuesta',    sc:'orange',score:83, assigned:'RP', date:'Ayer',  val:'$31,500'},
  {name:'Diego Castro',   co:'FinTech SA',   source:'LinkedIn',  stage:'Calificado',   sc:'blue',  score:69, assigned:'CG', date:'Hace 3d',val:'$12,400'},
  {name:'Carmen Reyes',   co:'Retail Plus',  source:'Sitio Web', stage:'Contactado',   sc:'purple',score:71, assigned:'JM', date:'Hace 2d',val:'$9,700'},
];

const sources=[{l:'Sitio Web',v:38,c:'#1a3d6b'},{l:'Referidos',v:27,c:'#c8a558'},{l:'LinkedIn',v:18,c:'#0e76a8'},{l:'Llamada fría',v:10,c:'#7c3aed'},{l:'Email',v:7,c:'#16a34a'}];

function LeadsPage(){
  return(
    <main className="flex-1 overflow-y-auto bg-slate-50">
      <div className="px-7 py-6 flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <div><h1 className="text-[24px] font-bold text-slate-900 tracking-[-0.5px]">Leads<span className="ml-2 bg-red-500 text-white text-[13px] font-bold px-2 py-0.5 rounded-full">12 nuevos</span></h1><p className="text-[13px] text-slate-500 mt-0.5">84 leads este mes · Tasa de conversión: 18.4%</p></div>
          <div className="flex gap-2">
            <button className="flex items-center gap-2 bg-white border border-slate-200 text-slate-600 text-[13px] font-medium px-3.5 py-2 rounded-lg">📥 Importar</button>
            <button className="flex items-center gap-2 bg-[#1a3d6b] text-white text-[13px] font-semibold px-3.5 py-2 rounded-lg"><IcoPlus/>Nuevo lead</button>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4">
          <KPI label="Total leads"       value="84"   color="#2563a8" bg="#dbeafe" icon="🎯" sub="↑ 13.5% vs mes ant."/>
          <KPI label="Calificados"       value="31"   color="#16a34a" bg="#dcfce7" icon="✅" sub="↑ 5 esta semana"/>
          <KPI label="Score promedio"    value="68"   color="#c8a558" bg="#fef9c3" icon="⭐" sub="↑ 3.2 pts"/>
          <KPI label="Descartados"       value="12"   color="#dc2626" bg="#fee2e2" icon="❌" sub="↓ 2 vs mes ant."/>
        </div>

        <div className="grid grid-cols-[1fr_280px] gap-4">
          {/* Table */}
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
              <div className="flex gap-1">
                {['Todos','Nuevos','Calificados','Contactados','Negociación','Descartados'].map((t,i)=>(
                  <button key={t} className={`px-3 py-1.5 rounded-lg text-[12px] font-medium ${i===0?'bg-[#1a3d6b] text-white':'text-slate-500 hover:bg-slate-100'}`}>{t}</button>
                ))}
              </div>
              <div className="relative"><span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400"><IcoSearch/></span><input readOnly placeholder="Buscar…" className="pl-8 pr-3 py-1.5 border border-slate-200 rounded-lg text-[12px] bg-slate-50 w-[160px]"/></div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead><tr className="bg-slate-50">{['Nombre','Empresa','Fuente','Etapa','Score','Valor est.','Asig.','Fecha',''].map(h=>(<th key={h} className="px-4 py-2.5 text-left text-[11px] font-semibold text-slate-400 uppercase tracking-wide whitespace-nowrap">{h}</th>))}</tr></thead>
                <tbody className="divide-y divide-slate-50">
                  {leads.map(l=>(
                    <tr key={l.name} className="hover:bg-slate-50 transition-colors">
                      <td className="px-4 py-3"><div className="flex items-center gap-2"><Avatar initials={l.name.split(' ').map(w=>w[0]).join('').slice(0,2)} gradient="linear-gradient(135deg,#2563a8,#1a3d6b)"/><span className="text-[13px] font-semibold text-slate-800 whitespace-nowrap">{l.name}</span></div></td>
                      <td className="px-4 py-3 text-[13px] text-slate-600 whitespace-nowrap">{l.co}</td>
                      <td className="px-4 py-3 text-[12px] text-slate-500 whitespace-nowrap">{l.source}</td>
                      <td className="px-4 py-3"><Badge color={l.sc}>{l.stage}</Badge></td>
                      <td className="px-4 py-3"><div className="flex items-center gap-2"><div className="w-14"><ProgressBar pct={l.score} color={l.score>=80?'#16a34a':l.score>=60?'#d97706':'#dc2626'}/></div><span className="text-[12px] font-bold text-slate-700">{l.score}</span></div></td>
                      <td className="px-4 py-3 text-[12px] font-semibold text-slate-700 whitespace-nowrap">{l.val}</td>
                      <td className="px-4 py-3"><div className="w-7 h-7 rounded-full bg-[#1a3d6b] text-white text-[11px] font-bold flex items-center justify-center">{l.assigned}</div></td>
                      <td className="px-4 py-3 text-[11px] text-slate-400 whitespace-nowrap">{l.date}</td>
                      <td className="px-4 py-3"><button className="text-slate-400 hover:text-slate-600"><IcoMore/></button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Side: source chart */}
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-100"><h3 className="text-[14px] font-bold text-slate-800">Leads por Fuente</h3></div>
            <div className="p-5 flex flex-col gap-4">
              {sources.map(s=>(
                <div key={s.l}>
                  <div className="flex justify-between mb-1"><span className="text-[13px] text-slate-600 font-medium">{s.l}</span><span className="text-[12px] font-bold text-slate-700">{s.v}%</span></div>
                  <ProgressBar pct={s.v*2.5>100?100:s.v*2.5} color={s.c}/>
                </div>
              ))}
            </div>
            <div className="px-5 pb-5">
              <div className="bg-slate-50 rounded-xl p-4 flex flex-col gap-2.5">
                <div className="text-[12px] font-bold text-slate-600 uppercase tracking-wide">Resumen del mes</div>
                {[{l:'Leads nuevos',v:'84'},{l:'Convertidos',v:'15'},{l:'En proceso',v:'57'},{l:'Tasa conversión',v:'18.4%'}].map(r=>(
                  <div key={r.l} className="flex justify-between"><span className="text-[13px] text-slate-600">{r.l}</span><span className="text-[13px] font-bold text-slate-800">{r.v}</span></div>
                ))}
              </div>
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
      <Sidebar/><div className="flex flex-col flex-1 min-w-0"><Header title="Leads"/><LeadsPage/></div>
    </div>
  );
}
