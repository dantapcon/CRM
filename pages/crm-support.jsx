// ── NexusCRM · Tickets de Soporte ────────────────────────────
function Badge({color,children}){const c={blue:'bg-blue-100 text-blue-700',green:'bg-green-100 text-green-700',red:'bg-red-100 text-red-700',yellow:'bg-yellow-100 text-yellow-700',orange:'bg-orange-100 text-orange-700',purple:'bg-purple-100 text-purple-700',gray:'bg-slate-100 text-slate-600',navy:'bg-blue-50 text-blue-900',gold:'bg-amber-100 text-amber-800'};return<span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold whitespace-nowrap ${c[color]??c.gray}`}>{children}</span>;}
function Avatar({initials,gradient,size='sm'}){const s={sm:'w-8 h-8 text-xs',md:'w-10 h-10 text-sm'};return<div className={`${s[size]} rounded-full flex items-center justify-center font-bold text-white flex-shrink-0`}style={{background:gradient??'linear-gradient(135deg,#1a3d6b,#2563a8)'}}>{initials}</div>;}
function IcoSearch(){return<svg width="14"height="14"viewBox="0 0 24 24"fill="none"stroke="currentColor"strokeWidth="2"><circle cx="11"cy="11"r="8"/><line x1="21"y1="21"x2="16.65"y2="16.65"/></svg>}
function IcoPlus(){return<svg width="14"height="14"viewBox="0 0 24 24"fill="none"stroke="currentColor"strokeWidth="2.5"><line x1="12"y1="5"x2="12"y2="19"/><line x1="5"y1="12"x2="19"y2="12"/></svg>}
function IcoBell(){return<svg width="16"height="16"viewBox="0 0 24 24"fill="none"stroke="currentColor"strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>}
function IcoSettings(){return<svg width="15"height="15"viewBox="0 0 24 24"fill="none"stroke="currentColor"strokeWidth="2"><circle cx="12"cy="12"r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>}
function IcoMore(){return<svg width="15"height="15"viewBox="0 0 24 24"fill="none"stroke="currentColor"strokeWidth="2"><circle cx="5"cy="12"r="1"/><circle cx="12"cy="12"r="1"/><circle cx="19"cy="12"r="1"/></svg>}
function IcoFlag(){return<svg width="12"height="12"viewBox="0 0 24 24"fill="currentColor"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1v12zm0 7v-7"/></svg>}

const NAV=[
  {g:'Principal',      items:[{l:'Dashboard',a:false,b:null,ico:'📊'}]},
  {g:'Ventas & CRM',   items:[{l:'Contactos',a:false,b:null,ico:'👤'},{l:'Cuentas',a:false,b:null,ico:'🏢'},{l:'Leads',a:false,b:'12',ico:'🎯'},{l:'Oportunidades',a:false,b:null,ico:'💼'},{l:'Actividades',a:false,b:'5',ico:'✅'},{l:'Calendario',a:false,b:null,ico:'📅'}]},
  {g:'Comercial',      items:[{l:'Productos',a:false,b:null,ico:'📦'},{l:'Cotizaciones',a:false,b:'3',ico:'📋'},{l:'Facturas',a:false,b:null,ico:'🧾'}]},
  {g:'Marketing',      items:[{l:'Campañas',a:false,b:null,ico:'📣'}]},
  {g:'Soporte',        items:[{l:'Tickets',a:true,b:'8',ico:'🎫'},{l:'Documentos',a:false,b:null,ico:'📁'}]},
  {g:'Análisis',       items:[{l:'Reportes',a:false,b:null,ico:'📈'}]},
  {g:'Administración', items:[{l:'Equipo',a:false,b:null,ico:'👥'},{l:'Configuración',a:false,b:null,ico:'⚙️'}]},
];
function Sidebar(){return(<aside className="w-[260px] min-h-screen bg-[#0f2240] text-slate-400 flex flex-col flex-shrink-0"><div className="px-5 py-5 border-b border-white/[0.08]"><div className="flex items-center gap-2.5"><div className="w-[34px] h-[34px] rounded-[8px] flex items-center justify-center font-bold text-white"style={{background:'linear-gradient(135deg,#2563a8,#c8a558)'}}>N</div><div><div className="text-[17px] font-bold text-white tracking-[-0.4px]">NexusCRM</div><div className="text-[10px] text-[#c8a558] font-semibold tracking-widest uppercase">Enterprise Suite</div></div></div></div><nav className="flex-1 py-2 overflow-y-auto">{NAV.map(g=>(<div key={g.g}><div className="px-5 pt-4 pb-1.5 text-[10px] font-semibold tracking-[0.1em] uppercase text-slate-600">{g.g}</div>{g.items.map(item=>(<a key={item.l} href="#"className={`flex items-center gap-2.5 px-5 py-[9px] text-[13px] font-medium transition-colors ${item.a?'bg-[rgba(37,99,168,0.35)] text-white border-r-[3px] border-[#c8a558]':'text-slate-400 hover:bg-white/[0.06] hover:text-slate-200'}`}><span>{item.ico}</span><span>{item.l}</span>{item.b&&<span className="ml-auto bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center">{item.b}</span>}</a>))}</div>))}</nav><div className="px-5 py-4 border-t border-white/[0.08]"><div className="flex items-center gap-2.5"><Avatar initials="JM" gradient="linear-gradient(135deg,#c8a558,#a8873a)"/><div><div className="text-[12px] font-semibold text-slate-200">Juan Martínez</div><div className="text-[11px] text-slate-500">Administrador</div></div><button className="ml-auto text-slate-500"><IcoSettings/></button></div></div></aside>);}
function Header({title}){return(<header className="h-16 bg-white border-b border-slate-200 flex items-center px-6 gap-4 sticky top-0 z-40"><div className="flex items-center gap-1.5 text-[13px] flex-1"><span className="text-[#2563a8] font-medium">NexusCRM</span><span className="text-slate-300">›</span><span className="text-slate-700 font-semibold">{title}</span></div><div className="relative max-w-[280px] w-full"><span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"><IcoSearch/></span><input readOnly placeholder="Buscar tickets…"className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-[13px] bg-slate-50"/></div><div className="flex items-center gap-2"><button className="relative w-9 h-9 flex items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100"><IcoBell/><span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"/></button><Avatar initials="JM" gradient="linear-gradient(135deg,#c8a558,#a8873a)"/></div></header>);}
function KPI({label,value,color,bg,icon,sub}){return(<div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm relative overflow-hidden"style={{borderTop:`3px solid ${color}`}}><div className="absolute top-4 right-4 w-9 h-9 rounded-lg flex items-center justify-center text-base"style={{background:bg}}>{icon}</div><div className="text-[26px] font-bold text-slate-800 leading-tight">{value}</div><div className="text-[12px] text-slate-500 font-medium mt-1">{label}</div>{sub&&<div className={`text-[11px] font-semibold mt-1 ${sub.includes('↓')||sub.includes('min')?'text-green-600':'text-slate-400'}`}>{sub}</div>}</div>);}

const prio={Alta:{c:'red',dot:'bg-red-500'},Media:{c:'yellow',dot:'bg-yellow-500'},Baja:{c:'green',dot:'bg-green-500'},Crítica:{c:'purple',dot:'bg-purple-600'}};
const tickets=[
  {id:'TKT-2026-412',subject:'Error al exportar reportes PDF',client:'Alpha Corp',contact:'Laura J.',prior:'Crítica',estado:'Abierto',ec:'red',agent:'JM',tiempo:'2h',created:'Hoy'},
  {id:'TKT-2026-411',subject:'Integración API falla esporádicamente',client:'Tecno S.A.',contact:'Carlos R.',prior:'Alta',estado:'En proceso',ec:'orange',agent:'RP',tiempo:'8h',created:'Hoy'},
  {id:'TKT-2026-410',subject:'No carga dashboard en Safari',client:'Global Corp',contact:'Pedro V.',prior:'Media',estado:'Abierto',ec:'orange',agent:'CG',tiempo:'1d',created:'Ayer'},
  {id:'TKT-2026-409',subject:'Configurar permisos por rol',client:'DataPoint',contact:'María F.',prior:'Baja',estado:'Abierto',ec:'blue',agent:'JM',tiempo:'2d',created:'Ayer'},
  {id:'TKT-2026-408',subject:'Importación CSV duplica registros',client:'NetSol',contact:'Sofía M.',prior:'Alta',estado:'En proceso',ec:'orange',agent:'RP',tiempo:'3d',created:'Hace 3d'},
  {id:'TKT-2026-407',subject:'Notificaciones email no llegan',client:'MegaTrade',contact:'Luis T.',prior:'Media',estado:'Abierto',ec:'orange',agent:'CG',tiempo:'4d',created:'Hace 4d'},
  {id:'TKT-2026-406',subject:'Campo personalizado no se guarda',client:'TechPlus',contact:'Roberto G.',prior:'Baja',estado:'Resuelto',ec:'green',agent:'JM',tiempo:'5d',created:'Hace 5d'},
  {id:'TKT-2026-405',subject:'Reporte de ventas incorrecto',client:'Innova LLC',contact:'Ana L.',prior:'Alta',estado:'Resuelto',ec:'green',agent:'RP',tiempo:'6d',created:'Hace 6d'},
];

function SupportPage(){
  return(
    <main className="flex-1 overflow-y-auto bg-slate-50">
      <div className="px-7 py-6 flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <div><h1 className="text-[24px] font-bold text-slate-900 tracking-[-0.5px]">Soporte · Tickets</h1><p className="text-[13px] text-slate-500 mt-0.5">8 tickets activos · <span className="text-red-600 font-semibold">1 crítico</span></p></div>
          <div className="flex gap-2">
            <button className="flex items-center gap-2 bg-white border border-slate-200 text-slate-600 text-[13px] font-medium px-3.5 py-2 rounded-lg">📥 Exportar</button>
            <button className="flex items-center gap-2 bg-[#1a3d6b] text-white text-[13px] font-semibold px-3.5 py-2 rounded-lg"><IcoPlus/>Nuevo ticket</button>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4">
          <KPI label="Tickets abiertos"   value="8"    color="#dc2626" bg="#fee2e2" icon="🎫" sub="↑ 2 vs ayer"/>
          <KPI label="En proceso"         value="2"    color="#d97706" bg="#ffedd5" icon="🔧" sub="asignados"/>
          <KPI label="Resueltos hoy"      value="3"    color="#16a34a" bg="#dcfce7" icon="✅" sub="↑ buen día"/>
          <KPI label="Tiempo promedio"    value="4.2h" color="#2563a8" bg="#dbeafe" icon="⏱" sub="↓ 0.8h mejor"/>
        </div>

        {/* SLA Bar */}
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-5">
          <div className="flex items-center justify-between mb-3"><h3 className="text-[14px] font-bold text-slate-800">Cumplimiento SLA</h3><span className="text-[12px] text-slate-400">Meta: 95%</span></div>
          <div className="flex gap-4">
            {[{l:'Respuesta inicial (<1h)',v:88,c:'#2563a8'},{l:'Resolución (<24h)',v:76,c:'#c8a558'},{l:'Satisfacción cliente',v:94,c:'#16a34a'}].map(s=>(
              <div key={s.l} className="flex-1">
                <div className="flex items-center justify-between mb-1.5"><span className="text-[12px] text-slate-600">{s.l}</span><span className="text-[13px] font-bold"style={{color:s.c}}>{s.v}%</span></div>
                <div className="h-2 bg-slate-100 rounded-full"><div className="h-full rounded-full"style={{width:`${s.v}%`,background:s.c}}/></div>
              </div>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
            <div className="flex gap-1">
              {['Todos','Abiertos','En proceso','Resueltos'].map(t=>(
                <button key={t} className={`px-3.5 py-1.5 text-[12px] font-semibold rounded-lg transition-colors ${t==='Todos'?'bg-[#1a3d6b] text-white':'text-slate-500 hover:bg-slate-100'}`}>{t}</button>
              ))}
            </div>
            <select className="py-1.5 px-3 border border-slate-200 rounded-lg text-[12px] text-slate-600 bg-slate-50"><option>Todos los agentes</option><option>JM</option><option>RP</option><option>CG</option></select>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead><tr className="bg-slate-50">{['ID','Asunto','Cliente','Prioridad','Estado','Agente','Tiempo abierto','Creado',''].map(h=><th key={h} className="px-4 py-2.5 text-left text-[11px] font-semibold text-slate-400 uppercase tracking-wide whitespace-nowrap">{h}</th>)}</tr></thead>
              <tbody className="divide-y divide-slate-50">
                {tickets.map((t,i)=>(
                  <tr key={i} className={`hover:bg-slate-50 transition-colors ${t.prior==='Crítica'?'bg-red-50/30':''}`}>
                    <td className="px-4 py-3 text-[12px] font-mono text-[#2563a8] font-semibold">{t.id}</td>
                    <td className="px-4 py-3">
                      <div className="text-[13px] font-semibold text-slate-800 max-w-[260px] truncate">{t.subject}</div>
                      <div className="text-[11px] text-slate-400">{t.contact}</div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Avatar initials={t.client.slice(0,2)} gradient="linear-gradient(135deg,#2563a8,#1a3d6b)" size="sm"/>
                        <span className="text-[13px] text-slate-600">{t.client}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1.5">
                        <span className={`w-2 h-2 rounded-full flex-shrink-0 ${prio[t.prior]?.dot??'bg-slate-300'}`}/>
                        <Badge color={prio[t.prior]?.c??'gray'}>{t.prior}</Badge>
                      </div>
                    </td>
                    <td className="px-4 py-3"><Badge color={t.ec}>{t.estado}</Badge></td>
                    <td className="px-4 py-3"><Avatar initials={t.agent} gradient="linear-gradient(135deg,#1a3d6b,#2563a8)" size="sm"/></td>
                    <td className="px-4 py-3 text-[13px] font-semibold text-slate-700">{t.tiempo}</td>
                    <td className="px-4 py-3 text-[12px] text-slate-400">{t.created}</td>
                    <td className="px-4 py-3"><button className="text-slate-400 hover:text-slate-600"><IcoMore/></button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}

export default function Container(){
  return(
    <div className="flex bg-slate-50 font-['Inter',sans-serif]"style={{width:1493,minHeight:900}}tabIndex="-1">
      <Sidebar/><div className="flex flex-col flex-1 min-w-0"><Header title="Tickets de Soporte"/><SupportPage/></div>
    </div>
  );
}
