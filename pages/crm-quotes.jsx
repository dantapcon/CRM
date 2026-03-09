// ── NexusCRM · Cotizaciones ──────────────────────────────────
function Badge({color,children}){const c={blue:'bg-blue-100 text-blue-700',green:'bg-green-100 text-green-700',red:'bg-red-100 text-red-700',yellow:'bg-yellow-100 text-yellow-700',orange:'bg-orange-100 text-orange-700',purple:'bg-purple-100 text-purple-700',gray:'bg-slate-100 text-slate-600',navy:'bg-blue-50 text-blue-900',gold:'bg-amber-100 text-amber-800'};return<span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold whitespace-nowrap ${c[color]??c.gray}`}>{children}</span>;}
function Avatar({initials,gradient,size='sm'}){const s={sm:'w-8 h-8 text-xs',md:'w-10 h-10 text-sm'};return<div className={`${s[size]} rounded-full flex items-center justify-center font-bold text-white flex-shrink-0`}style={{background:gradient??'linear-gradient(135deg,#1a3d6b,#2563a8)'}}>{initials}</div>;}
function IcoSearch(){return<svg width="14"height="14"viewBox="0 0 24 24"fill="none"stroke="currentColor"strokeWidth="2"><circle cx="11"cy="11"r="8"/><line x1="21"y1="21"x2="16.65"y2="16.65"/></svg>}
function IcoPlus(){return<svg width="14"height="14"viewBox="0 0 24 24"fill="none"stroke="currentColor"strokeWidth="2.5"><line x1="12"y1="5"x2="12"y2="19"/><line x1="5"y1="12"x2="19"y2="12"/></svg>}
function IcoBell(){return<svg width="16"height="16"viewBox="0 0 24 24"fill="none"stroke="currentColor"strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>}
function IcoSettings(){return<svg width="15"height="15"viewBox="0 0 24 24"fill="none"stroke="currentColor"strokeWidth="2"><circle cx="12"cy="12"r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>}
function IcoMore(){return<svg width="15"height="15"viewBox="0 0 24 24"fill="none"stroke="currentColor"strokeWidth="2"><circle cx="5"cy="12"r="1"/><circle cx="12"cy="12"r="1"/><circle cx="19"cy="12"r="1"/></svg>}
function IcoEye(){return<svg width="13"height="13"viewBox="0 0 24 24"fill="none"stroke="currentColor"strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12"cy="12"r="3"/></svg>}
function IcoSend(){return<svg width="13"height="13"viewBox="0 0 24 24"fill="none"stroke="currentColor"strokeWidth="2"><line x1="22"y1="2"x2="11"y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>}

const NAV=[
  {g:'Principal',      items:[{l:'Dashboard',a:false,b:null,ico:'📊'}]},
  {g:'Ventas & CRM',   items:[{l:'Contactos',a:false,b:null,ico:'👤'},{l:'Cuentas',a:false,b:null,ico:'🏢'},{l:'Leads',a:false,b:'12',ico:'🎯'},{l:'Oportunidades',a:false,b:null,ico:'💼'},{l:'Actividades',a:false,b:'5',ico:'✅'},{l:'Calendario',a:false,b:null,ico:'📅'}]},
  {g:'Comercial',      items:[{l:'Productos',a:false,b:null,ico:'📦'},{l:'Cotizaciones',a:true,b:'3',ico:'📋'},{l:'Facturas',a:false,b:null,ico:'🧾'}]},
  {g:'Marketing',      items:[{l:'Campañas',a:false,b:null,ico:'📣'}]},
  {g:'Soporte',        items:[{l:'Tickets',a:false,b:'8',ico:'🎫'},{l:'Documentos',a:false,b:null,ico:'📁'}]},
  {g:'Análisis',       items:[{l:'Reportes',a:false,b:null,ico:'📈'}]},
  {g:'Administración', items:[{l:'Equipo',a:false,b:null,ico:'👥'},{l:'Configuración',a:false,b:null,ico:'⚙️'}]},
];
function Sidebar(){return(<aside className="w-[260px] min-h-screen bg-[#0f2240] text-slate-400 flex flex-col flex-shrink-0"><div className="px-5 py-5 border-b border-white/[0.08]"><div className="flex items-center gap-2.5"><div className="w-[34px] h-[34px] rounded-[8px] flex items-center justify-center font-bold text-white"style={{background:'linear-gradient(135deg,#2563a8,#c8a558)'}}>N</div><div><div className="text-[17px] font-bold text-white tracking-[-0.4px]">NexusCRM</div><div className="text-[10px] text-[#c8a558] font-semibold tracking-widest uppercase">Enterprise Suite</div></div></div></div><nav className="flex-1 py-2 overflow-y-auto">{NAV.map(g=>(<div key={g.g}><div className="px-5 pt-4 pb-1.5 text-[10px] font-semibold tracking-[0.1em] uppercase text-slate-600">{g.g}</div>{g.items.map(item=>(<a key={item.l} href="#"className={`flex items-center gap-2.5 px-5 py-[9px] text-[13px] font-medium transition-colors ${item.a?'bg-[rgba(37,99,168,0.35)] text-white border-r-[3px] border-[#c8a558]':'text-slate-400 hover:bg-white/[0.06] hover:text-slate-200'}`}><span>{item.ico}</span><span>{item.l}</span>{item.b&&<span className="ml-auto bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center">{item.b}</span>}</a>))}</div>))}</nav><div className="px-5 py-4 border-t border-white/[0.08]"><div className="flex items-center gap-2.5"><Avatar initials="JM" gradient="linear-gradient(135deg,#c8a558,#a8873a)"/><div><div className="text-[12px] font-semibold text-slate-200">Juan Martínez</div><div className="text-[11px] text-slate-500">Administrador</div></div><button className="ml-auto text-slate-500"><IcoSettings/></button></div></div></aside>);}
function Header({title}){return(<header className="h-16 bg-white border-b border-slate-200 flex items-center px-6 gap-4 sticky top-0 z-40"><div className="flex items-center gap-1.5 text-[13px] flex-1"><span className="text-[#2563a8] font-medium">NexusCRM</span><span className="text-slate-300">›</span><span className="text-slate-700 font-semibold">{title}</span></div><div className="relative max-w-[280px] w-full"><span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"><IcoSearch/></span><input readOnly placeholder="Buscar cotizaciones…"className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-[13px] bg-slate-50"/></div><div className="flex items-center gap-2"><button className="relative w-9 h-9 flex items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100"><IcoBell/><span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"/></button><Avatar initials="JM" gradient="linear-gradient(135deg,#c8a558,#a8873a)"/></div></header>);}
function KPI({label,value,color,bg,icon,sub}){return(<div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm relative overflow-hidden"style={{borderTop:`3px solid ${color}`}}><div className="absolute top-4 right-4 w-9 h-9 rounded-lg flex items-center justify-center text-base"style={{background:bg}}>{icon}</div><div className="text-[26px] font-bold text-slate-800 leading-tight">{value}</div><div className="text-[12px] text-slate-500 font-medium mt-1">{label}</div>{sub&&<div className="text-[11px] text-green-600 font-semibold mt-1">{sub}</div>}</div>);}

const quotes=[
  {id:'COT-2026-041',client:'Tecno S.A.',contact:'Carlos Ruiz',items:5,monto:'$12,500',estado:'Aprobada',ec:'green',fecha:'5 Mar 2026',vence:'5 Abr 2026',owner:'JM'},
  {id:'COT-2026-040',client:'Global Corp',contact:'Pedro Vargas',items:3,monto:'$38,700',estado:'Pendiente',ec:'yellow',fecha:'3 Mar 2026',vence:'3 Abr 2026',owner:'RP'},
  {id:'COT-2026-039',client:'Innova LLC',contact:'Ana López',items:7,monto:'$8,250',estado:'Pendiente',ec:'yellow',fecha:'28 Feb 2026',vence:'28 Mar 2026',owner:'JM'},
  {id:'COT-2026-038',client:'NetSol',contact:'Sofía Méndez',items:2,monto:'$4,800',estado:'Rechazada',ec:'red',fecha:'22 Feb 2026',vence:'22 Mar 2026',owner:'CG'},
  {id:'COT-2026-037',client:'DataPoint',contact:'María Fernández',items:4,monto:'$16,400',estado:'Aprobada',ec:'green',fecha:'18 Feb 2026',vence:'18 Mar 2026',owner:'JM'},
  {id:'COT-2026-036',client:'MegaTrade',contact:'Luis Torres',items:6,monto:'$29,900',estado:'Pendiente',ec:'yellow',fecha:'15 Feb 2026',vence:'15 Mar 2026',owner:'RP'},
  {id:'COT-2026-035',client:'TechPlus',contact:'Roberto Gómez',items:3,monto:'$7,600',estado:'Aprobada',ec:'green',fecha:'10 Feb 2026',vence:'10 Mar 2026',owner:'CG'},
  {id:'COT-2026-034',client:'Alpha Corp',contact:'Laura Jiménez',items:8,monto:'$52,000',estado:'Aprobada',ec:'green',fecha:'5 Feb 2026',vence:'5 Mar 2026',owner:'JM'},
];

function QuotesPage(){
  return(
    <main className="flex-1 overflow-y-auto bg-slate-50">
      <div className="px-7 py-6 flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <div><h1 className="text-[24px] font-bold text-slate-900 tracking-[-0.5px]">Cotizaciones</h1><p className="text-[13px] text-slate-500 mt-0.5">8 cotizaciones · $169,150 en total · <span className="text-orange-600 font-semibold">3 pendientes</span></p></div>
          <div className="flex gap-2">
            <button className="flex items-center gap-2 bg-white border border-slate-200 text-slate-600 text-[13px] font-medium px-3.5 py-2 rounded-lg">📥 Importar</button>
            <button className="flex items-center gap-2 bg-[#1a3d6b] text-white text-[13px] font-semibold px-3.5 py-2 rounded-lg"><IcoPlus/>Nueva cotización</button>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4">
          <KPI label="Valor total"      value="$169K" color="#2563a8" bg="#dbeafe" icon="💰" sub="este mes"/>
          <KPI label="Aprobadas"        value="4"     color="#16a34a" bg="#dcfce7" icon="✅" sub="$73,700"/>
          <KPI label="Pendientes"       value="3"     color="#d97706" bg="#ffedd5" icon="⏳" sub="$80,850"/>
          <KPI label="Rechazadas"       value="1"     color="#dc2626" bg="#fee2e2" icon="❌" sub="$4,800"/>
        </div>

        {/* Table */}
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
            <div className="flex gap-1">
              {['Todas','Aprobadas','Pendientes','Rechazadas'].map(t=>(
                <button key={t} className={`px-3.5 py-1.5 text-[12px] font-semibold rounded-lg transition-colors ${t==='Todas'?'bg-[#1a3d6b] text-white':'text-slate-500 hover:bg-slate-100'}`}>{t}</button>
              ))}
            </div>
            <select className="py-1.5 px-3 border border-slate-200 rounded-lg text-[12px] text-slate-600 bg-slate-50"><option>Marzo 2026</option><option>Febrero 2026</option></select>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead><tr className="bg-slate-50">{['ID','Cliente','Contacto','Ítems','Monto','Estado','Fecha','Vence','Asignado',''].map(h=><th key={h} className="px-4 py-2.5 text-left text-[11px] font-semibold text-slate-400 uppercase tracking-wide whitespace-nowrap">{h}</th>)}</tr></thead>
              <tbody className="divide-y divide-slate-50">
                {quotes.map((q,i)=>(
                  <tr key={i} className={`hover:bg-slate-50 transition-colors ${q.estado==='Pendiente'?'bg-amber-50/30':''}`}>
                    <td className="px-4 py-3 text-[12px] font-mono text-[#2563a8] font-semibold">{q.id}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Avatar initials={q.client.slice(0,2)} gradient="linear-gradient(135deg,#2563a8,#1a3d6b)" size="sm"/>
                        <span className="text-[13px] font-semibold text-slate-800">{q.client}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-[13px] text-slate-600">{q.contact}</td>
                    <td className="px-4 py-3 text-center"><span className="w-7 h-7 bg-blue-50 text-blue-700 text-[12px] font-bold rounded-full flex items-center justify-center">{q.items}</span></td>
                    <td className="px-4 py-3 text-[14px] font-bold text-slate-800">{q.monto}</td>
                    <td className="px-4 py-3"><Badge color={q.ec}>{q.estado}</Badge></td>
                    <td className="px-4 py-3 text-[12px] text-slate-500">{q.fecha}</td>
                    <td className="px-4 py-3 text-[12px] text-slate-500">{q.vence}</td>
                    <td className="px-4 py-3"><Avatar initials={q.owner} gradient="linear-gradient(135deg,#1a3d6b,#2563a8)" size="sm"/></td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1.5">
                        <button className="w-7 h-7 flex items-center justify-center rounded-lg bg-slate-100 text-slate-500 hover:bg-blue-100 hover:text-blue-600"><IcoEye/></button>
                        <button className="w-7 h-7 flex items-center justify-center rounded-lg bg-slate-100 text-slate-500 hover:bg-green-100 hover:text-green-600"><IcoSend/></button>
                        <button className="text-slate-400 hover:text-slate-600"><IcoMore/></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-5 py-3 border-t border-slate-100 flex items-center justify-between">
            <span className="text-[12px] text-slate-400">Mostrando 8 de 41 cotizaciones</span>
            <div className="flex gap-1">{[1,2,3,'…',8].map((p,i)=><button key={i} className={`w-7 h-7 flex items-center justify-center rounded text-[12px] ${p===1?'bg-[#1a3d6b] text-white':'border border-slate-200 text-slate-600'}`}>{p}</button>)}</div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default function Container(){
  return(
    <div className="flex bg-slate-50 font-['Inter',sans-serif]"style={{width:1493,minHeight:900}}tabIndex="-1">
      <Sidebar/><div className="flex flex-col flex-1 min-w-0"><Header title="Cotizaciones"/><QuotesPage/></div>
    </div>
  );
}
