// ── NexusCRM · Actividades ────────────────────────────────────
function Badge({color,children}){const c={blue:'bg-blue-100 text-blue-700',green:'bg-green-100 text-green-700',red:'bg-red-100 text-red-700',yellow:'bg-yellow-100 text-yellow-700',orange:'bg-orange-100 text-orange-700',purple:'bg-purple-100 text-purple-700',gray:'bg-slate-100 text-slate-600',navy:'bg-blue-50 text-blue-900',gold:'bg-amber-100 text-amber-800'};return<span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold whitespace-nowrap ${c[color]??c.gray}`}>{children}</span>;}
function Avatar({initials,gradient,size='sm'}){const s={sm:'w-8 h-8 text-xs',md:'w-10 h-10 text-sm'};return<div className={`${s[size]} rounded-full flex items-center justify-center font-bold text-white flex-shrink-0`}style={{background:gradient??'linear-gradient(135deg,#1a3d6b,#2563a8)'}}>{initials}</div>;}
function IcoSearch(){return<svg width="14"height="14"viewBox="0 0 24 24"fill="none"stroke="currentColor"strokeWidth="2"><circle cx="11"cy="11"r="8"/><line x1="21"y1="21"x2="16.65"y2="16.65"/></svg>}
function IcoPlus(){return<svg width="14"height="14"viewBox="0 0 24 24"fill="none"stroke="currentColor"strokeWidth="2.5"><line x1="12"y1="5"x2="12"y2="19"/><line x1="5"y1="12"x2="19"y2="12"/></svg>}
function IcoBell(){return<svg width="16"height="16"viewBox="0 0 24 24"fill="none"stroke="currentColor"strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>}
function IcoSettings(){return<svg width="15"height="15"viewBox="0 0 24 24"fill="none"stroke="currentColor"strokeWidth="2"><circle cx="12"cy="12"r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>}
function IcoCheck(){return<svg width="14"height="14"viewBox="0 0 24 24"fill="none"stroke="currentColor"strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>}
function IcoClock(){return<svg width="13"height="13"viewBox="0 0 24 24"fill="none"stroke="currentColor"strokeWidth="2"><circle cx="12"cy="12"r="10"/><polyline points="12 6 12 12 16 14"/></svg>}

const NAV=[
  {g:'Principal',      items:[{l:'Dashboard',a:false,b:null,ico:'📊'}]},
  {g:'Ventas & CRM',   items:[{l:'Contactos',a:false,b:null,ico:'👤'},{l:'Cuentas',a:false,b:null,ico:'🏢'},{l:'Leads',a:false,b:'12',ico:'🎯'},{l:'Oportunidades',a:false,b:null,ico:'💼'},{l:'Actividades',a:true,b:'5',ico:'✅'},{l:'Calendario',a:false,b:null,ico:'📅'}]},
  {g:'Comercial',      items:[{l:'Productos',a:false,b:null,ico:'📦'},{l:'Cotizaciones',a:false,b:'3',ico:'📋'},{l:'Facturas',a:false,b:null,ico:'🧾'}]},
  {g:'Marketing',      items:[{l:'Campañas',a:false,b:null,ico:'📣'}]},
  {g:'Soporte',        items:[{l:'Tickets',a:false,b:'8',ico:'🎫'},{l:'Documentos',a:false,b:null,ico:'📁'}]},
  {g:'Análisis',       items:[{l:'Reportes',a:false,b:null,ico:'📈'}]},
  {g:'Administración', items:[{l:'Equipo',a:false,b:null,ico:'👥'},{l:'Configuración',a:false,b:null,ico:'⚙️'}]},
];
function Sidebar(){return(<aside className="w-[260px] min-h-screen bg-[#0f2240] text-slate-400 flex flex-col flex-shrink-0"><div className="px-5 py-5 border-b border-white/[0.08]"><div className="flex items-center gap-2.5"><div className="w-[34px] h-[34px] rounded-[8px] flex items-center justify-center font-bold text-white"style={{background:'linear-gradient(135deg,#2563a8,#c8a558)'}}>N</div><div><div className="text-[17px] font-bold text-white tracking-[-0.4px]">NexusCRM</div><div className="text-[10px] text-[#c8a558] font-semibold tracking-widest uppercase">Enterprise Suite</div></div></div></div><nav className="flex-1 py-2 overflow-y-auto">{NAV.map(g=>(<div key={g.g}><div className="px-5 pt-4 pb-1.5 text-[10px] font-semibold tracking-[0.1em] uppercase text-slate-600">{g.g}</div>{g.items.map(item=>(<a key={item.l} href="#"className={`flex items-center gap-2.5 px-5 py-[9px] text-[13px] font-medium transition-colors ${item.a?'bg-[rgba(37,99,168,0.35)] text-white border-r-[3px] border-[#c8a558]':'text-slate-400 hover:bg-white/[0.06] hover:text-slate-200'}`}><span>{item.ico}</span><span>{item.l}</span>{item.b&&<span className="ml-auto bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center">{item.b}</span>}</a>))}</div>))}</nav><div className="px-5 py-4 border-t border-white/[0.08]"><div className="flex items-center gap-2.5"><Avatar initials="JM" gradient="linear-gradient(135deg,#c8a558,#a8873a)"/><div><div className="text-[12px] font-semibold text-slate-200">Juan Martínez</div><div className="text-[11px] text-slate-500">Administrador</div></div><button className="ml-auto text-slate-500"><IcoSettings/></button></div></div></aside>);}
function Header({title}){return(<header className="h-16 bg-white border-b border-slate-200 flex items-center px-6 gap-4 sticky top-0 z-40"><div className="flex items-center gap-1.5 text-[13px] flex-1"><span className="text-[#2563a8] font-medium">NexusCRM</span><span className="text-slate-300">›</span><span className="text-slate-700 font-semibold">{title}</span></div><div className="relative max-w-[280px] w-full"><span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"><IcoSearch/></span><input readOnly placeholder="Buscar actividades…"className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-[13px] bg-slate-50"/></div><div className="flex items-center gap-2"><button className="relative w-9 h-9 flex items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100"><IcoBell/><span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"/></button><Avatar initials="JM" gradient="linear-gradient(135deg,#c8a558,#a8873a)"/></div></header>);}
function KPI({label,value,color,bg,icon}){return(<div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm relative overflow-hidden"style={{borderTop:`3px solid ${color}`}}><div className="absolute top-4 right-4 w-9 h-9 rounded-lg flex items-center justify-center text-base"style={{background:bg}}>{icon}</div><div className="text-[26px] font-bold text-slate-800 leading-tight">{value}</div><div className="text-[12px] text-slate-500 font-medium mt-1">{label}</div></div>);}

const TABS=['Todas','Llamadas','Emails','Reuniones','Tareas'];
const icoAct={'📞':'bg-blue-100 text-blue-700','📧':'bg-purple-100 text-purple-700','🤝':'bg-amber-100 text-amber-700','✅':'bg-green-100 text-green-700','📋':'bg-slate-100 text-slate-600'};

const activities=[
  {ico:'📞',type:'Llamada',title:'Llamada de seguimiento',contact:'Carlos Ruiz',company:'Tecno S.A.',time:'Hoy 10:30',owner:'JM',status:'Completada',bc:'green'},
  {ico:'📧',type:'Email',title:'Propuesta enviada por email',contact:'Ana López',company:'Innova LLC',time:'Hoy 09:15',owner:'RP',status:'Completada',bc:'green'},
  {ico:'🤝',type:'Reunión',title:'Demo del producto - Q3',contact:'Pedro Vargas',company:'GlobalNet',time:'Hoy 14:00',owner:'JM',status:'Pendiente',bc:'yellow'},
  {ico:'✅',type:'Tarea',title:'Actualizar propuesta comercial',contact:'María Fernández',company:'DataPoint',time:'Hoy 16:00',owner:'CG',status:'Pendiente',bc:'yellow'},
  {ico:'📞',type:'Llamada',title:'Negociación contrato anual',contact:'Luis Torres',company:'MegaTrade',time:'Ayer 15:30',owner:'JM',status:'Completada',bc:'green'},
  {ico:'📧',type:'Email',title:'Envío de factura',contact:'Sofía Méndez',company:'NetSol',time:'Ayer 11:00',owner:'RP',status:'Completada',bc:'green'},
  {ico:'🤝',type:'Reunión',title:'Kickoff proyecto CRM',contact:'Roberto Gómez',company:'TechPlus',time:'Hace 2d 10:00',owner:'JM',status:'Completada',bc:'green'},
  {ico:'📋',type:'Tarea',title:'Preparar informe mensual',contact:'—',company:'Interno',time:'Hace 3d',owner:'CG',status:'Completada',bc:'green'},
];

const upcoming=[
  {ico:'📞',title:'Llamada con Global Corp',time:'Hoy 14:30',owner:'JM'},
  {ico:'🤝',title:'Reunión kick-off NetSol',time:'Mañana 09:00',owner:'RP'},
  {ico:'✅',title:'Enviar cotización Tecno S.A.',time:'Mañana 12:00',owner:'JM'},
  {ico:'📧',title:'Follow-up MegaTrade',time:'Jue 10:30',owner:'CG'},
  {ico:'🤝',title:'Demo API Integration',time:'Vie 15:00',owner:'JM'},
];

function ActivitiesPage(){
  const [tab,setTab]=React.useState('Todas');
  return(
    <main className="flex-1 overflow-y-auto bg-slate-50">
      <div className="px-7 py-6 flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <div><h1 className="text-[24px] font-bold text-slate-900 tracking-[-0.5px]">Actividades</h1><p className="text-[13px] text-slate-500 mt-0.5">48 actividades este mes · 5 pendientes hoy</p></div>
          <div className="flex gap-2">
            <button className="flex items-center gap-2 bg-white border border-slate-200 text-slate-600 text-[13px] font-medium px-3.5 py-2 rounded-lg">📥 Importar</button>
            <button className="flex items-center gap-2 bg-[#1a3d6b] text-white text-[13px] font-semibold px-3.5 py-2 rounded-lg"><IcoPlus/>Nueva actividad</button>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4">
          <KPI label="Total actividades" value="48"  color="#2563a8" bg="#dbeafe" icon="📋"/>
          <KPI label="Completadas"       value="31"  color="#16a34a" bg="#dcfce7" icon="✅"/>
          <KPI label="Pendientes hoy"    value="5"   color="#d97706" bg="#ffedd5" icon="⏰"/>
          <KPI label="Vencidas"          value="2"   color="#dc2626" bg="#fee2e2" icon="⚠️"/>
        </div>

        <div className="flex gap-5">
          {/* Activity list */}
          <div className="flex-1 bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
              <div className="flex gap-1">
                {TABS.map(t=>(
                  <button key={t} onClick={()=>setTab(t)} className={`px-3.5 py-1.5 text-[12px] font-semibold rounded-lg transition-colors ${tab===t?'bg-[#1a3d6b] text-white':'text-slate-500 hover:bg-slate-100'}`}>{t}</button>
                ))}
              </div>
              <select className="py-1.5 px-3 border border-slate-200 rounded-lg text-[12px] text-slate-600 bg-slate-50"><option>Esta semana</option><option>Este mes</option><option>Último mes</option></select>
            </div>
            <div className="divide-y divide-slate-50">
              {activities.map((a,i)=>(
                <div key={i} className="flex items-start gap-3.5 px-5 py-3.5 hover:bg-slate-50 transition-colors">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-base flex-shrink-0 ${icoAct[a.ico]}`}>{a.ico}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-[13px] font-semibold text-slate-800">{a.title}</span>
                      <Badge color={a.bc}>{a.status}</Badge>
                    </div>
                    <div className="flex items-center gap-3 text-[12px] text-slate-400">
                      <span>👤 {a.contact}</span>
                      <span>🏢 {a.company}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <div className="flex items-center gap-1 text-[11px] text-slate-400"><IcoClock/>{a.time}</div>
                    <Avatar initials={a.owner} gradient="linear-gradient(135deg,#2563a8,#1a3d6b)" size="sm"/>
                    {a.status==='Pendiente'&&<button className="w-6 h-6 flex items-center justify-center rounded-full bg-green-100 text-green-600 hover:bg-green-200"><IcoCheck/></button>}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar upcoming */}
          <div className="w-[280px] flex flex-col gap-4 flex-shrink-0">
            <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-[14px] font-bold text-slate-800">Próximas Actividades</h3>
                <span className="text-[11px] font-semibold text-[#2563a8] cursor-pointer">Ver todas</span>
              </div>
              <div className="flex flex-col gap-2.5">
                {upcoming.map((u,i)=>(
                  <div key={i} className="flex items-start gap-2.5 p-2.5 rounded-lg bg-slate-50 hover:bg-blue-50 transition-colors cursor-pointer">
                    <span className="text-base mt-0.5">{u.ico}</span>
                    <div className="flex-1 min-w-0">
                      <div className="text-[12px] font-semibold text-slate-700 leading-tight">{u.title}</div>
                      <div className="flex items-center gap-1 text-[11px] text-slate-400 mt-0.5"><IcoClock/>{u.time}</div>
                    </div>
                    <Avatar initials={u.owner} gradient="linear-gradient(135deg,#2563a8,#1a3d6b)" size="sm"/>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-5">
              <h3 className="text-[14px] font-bold text-slate-800 mb-4">Por Tipo (este mes)</h3>
              {[{l:'Llamadas',n:18,color:'#2563a8',pct:37},{l:'Emails',n:14,color:'#7c3aed',pct:29},{l:'Reuniones',n:10,color:'#c8a558',pct:21},{l:'Tareas',n:6,color:'#16a34a',pct:13}].map(r=>(
                <div key={r.l} className="mb-3">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[12px] font-medium text-slate-600">{r.l}</span>
                    <span className="text-[12px] font-bold text-slate-700">{r.n}</span>
                  </div>
                  <div className="h-1.5 bg-slate-100 rounded-full"><div className="h-full rounded-full"style={{width:`${r.pct}%`,background:r.color}}/></div>
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
      <Sidebar/><div className="flex flex-col flex-1 min-w-0"><Header title="Actividades"/><ActivitiesPage/></div>
    </div>
  );
}
