// ── NexusCRM · Calendario ────────────────────────────────────
function Avatar({initials,gradient,size='sm'}){const s={sm:'w-8 h-8 text-xs',md:'w-10 h-10 text-sm'};return<div className={`${s[size]} rounded-full flex items-center justify-center font-bold text-white flex-shrink-0`}style={{background:gradient??'linear-gradient(135deg,#1a3d6b,#2563a8)'}}>{initials}</div>;}
function IcoSearch(){return<svg width="14"height="14"viewBox="0 0 24 24"fill="none"stroke="currentColor"strokeWidth="2"><circle cx="11"cy="11"r="8"/><line x1="21"y1="21"x2="16.65"y2="16.65"/></svg>}
function IcoPlus(){return<svg width="14"height="14"viewBox="0 0 24 24"fill="none"stroke="currentColor"strokeWidth="2.5"><line x1="12"y1="5"x2="12"y2="19"/><line x1="5"y1="12"x2="19"y2="12"/></svg>}
function IcoBell(){return<svg width="16"height="16"viewBox="0 0 24 24"fill="none"stroke="currentColor"strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>}
function IcoSettings(){return<svg width="15"height="15"viewBox="0 0 24 24"fill="none"stroke="currentColor"strokeWidth="2"><circle cx="12"cy="12"r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>}
function IcoChevL(){return<svg width="16"height="16"viewBox="0 0 24 24"fill="none"stroke="currentColor"strokeWidth="2"><polyline points="15 18 9 12 15 6"/></svg>}
function IcoChevR(){return<svg width="16"height="16"viewBox="0 0 24 24"fill="none"stroke="currentColor"strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>}

const NAV=[
  {g:'Principal',      items:[{l:'Dashboard',a:false,b:null,ico:'📊'}]},
  {g:'Ventas & CRM',   items:[{l:'Contactos',a:false,b:null,ico:'👤'},{l:'Cuentas',a:false,b:null,ico:'🏢'},{l:'Leads',a:false,b:'12',ico:'🎯'},{l:'Oportunidades',a:false,b:null,ico:'💼'},{l:'Actividades',a:false,b:'5',ico:'✅'},{l:'Calendario',a:true,b:null,ico:'📅'}]},
  {g:'Comercial',      items:[{l:'Productos',a:false,b:null,ico:'📦'},{l:'Cotizaciones',a:false,b:'3',ico:'📋'},{l:'Facturas',a:false,b:null,ico:'🧾'}]},
  {g:'Marketing',      items:[{l:'Campañas',a:false,b:null,ico:'📣'}]},
  {g:'Soporte',        items:[{l:'Tickets',a:false,b:'8',ico:'🎫'},{l:'Documentos',a:false,b:null,ico:'📁'}]},
  {g:'Análisis',       items:[{l:'Reportes',a:false,b:null,ico:'📈'}]},
  {g:'Administración', items:[{l:'Equipo',a:false,b:null,ico:'👥'},{l:'Configuración',a:false,b:null,ico:'⚙️'}]},
];
function Sidebar(){return(<aside className="w-[260px] min-h-screen bg-[#0f2240] text-slate-400 flex flex-col flex-shrink-0"><div className="px-5 py-5 border-b border-white/[0.08]"><div className="flex items-center gap-2.5"><div className="w-[34px] h-[34px] rounded-[8px] flex items-center justify-center font-bold text-white"style={{background:'linear-gradient(135deg,#2563a8,#c8a558)'}}>N</div><div><div className="text-[17px] font-bold text-white tracking-[-0.4px]">NexusCRM</div><div className="text-[10px] text-[#c8a558] font-semibold tracking-widest uppercase">Enterprise Suite</div></div></div></div><nav className="flex-1 py-2 overflow-y-auto">{NAV.map(g=>(<div key={g.g}><div className="px-5 pt-4 pb-1.5 text-[10px] font-semibold tracking-[0.1em] uppercase text-slate-600">{g.g}</div>{g.items.map(item=>(<a key={item.l} href="#"className={`flex items-center gap-2.5 px-5 py-[9px] text-[13px] font-medium transition-colors ${item.a?'bg-[rgba(37,99,168,0.35)] text-white border-r-[3px] border-[#c8a558]':'text-slate-400 hover:bg-white/[0.06] hover:text-slate-200'}`}><span>{item.ico}</span><span>{item.l}</span>{item.b&&<span className="ml-auto bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center">{item.b}</span>}</a>))}</div>))}</nav><div className="px-5 py-4 border-t border-white/[0.08]"><div className="flex items-center gap-2.5"><Avatar initials="JM" gradient="linear-gradient(135deg,#c8a558,#a8873a)"/><div><div className="text-[12px] font-semibold text-slate-200">Juan Martínez</div><div className="text-[11px] text-slate-500">Administrador</div></div><button className="ml-auto text-slate-500"><IcoSettings/></button></div></div></aside>);}
function Header({title}){return(<header className="h-16 bg-white border-b border-slate-200 flex items-center px-6 gap-4 sticky top-0 z-40"><div className="flex items-center gap-1.5 text-[13px] flex-1"><span className="text-[#2563a8] font-medium">NexusCRM</span><span className="text-slate-300">›</span><span className="text-slate-700 font-semibold">{title}</span></div><div className="relative max-w-[280px] w-full"><span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"><IcoSearch/></span><input readOnly placeholder="Buscar eventos…"className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-[13px] bg-slate-50"/></div><div className="flex items-center gap-2"><button className="relative w-9 h-9 flex items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100"><IcoBell/><span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"/></button><Avatar initials="JM" gradient="linear-gradient(135deg,#c8a558,#a8873a)"/></div></header>);}

// Calendar data: March 2026, starts on Sunday
const DAYS=['Dom','Lun','Mar','Mié','Jue','Vie','Sáb'];
const events={
  4: [{t:'Reunión Tecno S.A.',c:'#2563a8'},{t:'Llamada Global Corp',c:'#7c3aed'}],
  7: [{t:'Demo NetSol 10:00',c:'#16a34a'}],
  10:[{t:'Follow-up MegaTrade',c:'#c8a558'}],
  12:[{t:'Presentación Q1',c:'#dc2626'},{t:'Almuerzo ejecutivo',c:'#c8a558'}],
  15:[{t:'Llamada pipeline',c:'#2563a8'}],
  17:[{t:'Reunión equipo',c:'#7c3aed'}],
  19:[{t:'Cierre contrato',c:'#16a34a'}],
  22:[{t:'Llamada seguimiento',c:'#2563a8'},{t:'Review mensual',c:'#dc2626'}],
  25:[{t:'Demo Alpha Corp',c:'#2563a8'}],
  28:[{t:'Reunión directivos',c:'#7c3aed'}],
};

const upcoming=[
  {ico:'🤝',t:'Reunión Tecno S.A.',d:'Mié 4 Mar · 09:00',co:'Sala A',owner:'JM',c:'bg-blue-100 text-blue-700'},
  {ico:'📞',t:'Llamada Global Corp',d:'Mié 4 Mar · 11:30',co:'Zoom',owner:'RP',c:'bg-purple-100 text-purple-700'},
  {ico:'🖥️',t:'Demo NetSol',d:'Sáb 7 Mar · 10:00',co:'Teams',owner:'JM',c:'bg-green-100 text-green-700'},
  {ico:'🍽️',t:'Almuerzo ejecutivo',d:'Jue 12 Mar · 13:00',co:'Restaurante Plaza',owner:'CG',c:'bg-amber-100 text-amber-700'},
  {ico:'📊',t:'Presentación Q1',d:'Jue 12 Mar · 15:30',co:'Sala B',owner:'JM',c:'bg-red-100 text-red-700'},
  {ico:'📋',t:'Review mensual',d:'Dom 22 Mar · 10:00',co:'Sala A',owner:'JM',c:'bg-red-100 text-red-700'},
];

function CalendarPage(){
  // March 2026 starts on Sunday (0)
  const daysInMonth=31;
  const startDay=0;
  const cells=[];
  for(let i=0;i<startDay;i++) cells.push(null);
  for(let d=1;d<=daysInMonth;d++) cells.push(d);
  while(cells.length%7!==0) cells.push(null);
  const weeks=[];
  for(let i=0;i<cells.length;i+=7) weeks.push(cells.slice(i,i+7));

  return(
    <main className="flex-1 overflow-y-auto bg-slate-50">
      <div className="px-7 py-6 flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <div><h1 className="text-[24px] font-bold text-slate-900 tracking-[-0.5px]">Calendario</h1><p className="text-[13px] text-slate-500 mt-0.5">12 eventos en marzo 2026</p></div>
          <div className="flex gap-2">
            <button className="flex items-center gap-2 bg-white border border-slate-200 text-slate-600 text-[13px] font-medium px-3.5 py-2 rounded-lg">📋 Semana</button>
            <button className="flex items-center gap-2 bg-white border border-[#1a3d6b] text-[#1a3d6b] text-[13px] font-semibold px-3.5 py-2 rounded-lg">📅 Mes</button>
            <button className="flex items-center gap-2 bg-[#1a3d6b] text-white text-[13px] font-semibold px-3.5 py-2 rounded-lg"><IcoPlus/>Nuevo evento</button>
          </div>
        </div>

        <div className="flex gap-5">
          {/* Calendar grid */}
          <div className="flex-1 bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
            {/* Month nav */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
              <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 text-slate-500"><IcoChevL/></button>
              <h2 className="text-[16px] font-bold text-slate-800">Marzo 2026</h2>
              <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 text-slate-500"><IcoChevR/></button>
            </div>
            {/* Day headers */}
            <div className="grid grid-cols-7 border-b border-slate-100">
              {DAYS.map(d=><div key={d} className="py-2.5 text-center text-[11px] font-bold text-slate-400 uppercase tracking-wide">{d}</div>)}
            </div>
            {/* Weeks */}
            {weeks.map((week,wi)=>(
              <div key={wi} className="grid grid-cols-7 border-b border-slate-50 last:border-0">
                {week.map((day,di)=>(
                  <div key={di} className={`min-h-[90px] p-2 border-r border-slate-50 last:border-0 ${day===null?'bg-slate-50/50':''} ${day===13?'bg-[#eef4ff]':''}`}>
                    {day&&(
                      <>
                        <div className={`w-7 h-7 flex items-center justify-center rounded-full text-[13px] font-semibold mb-1 ${day===13?'bg-[#1a3d6b] text-white':'text-slate-700'}`}>{day}</div>
                        {(events[day]||[]).map((ev,ei)=>(
                          <div key={ei} className="text-[10px] font-medium px-1.5 py-0.5 rounded mb-0.5 truncate text-white"style={{background:ev.c}}>{ev.t}</div>
                        ))}
                      </>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* Sidebar */}
          <div className="w-[280px] flex flex-col gap-4 flex-shrink-0">
            <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-[14px] font-bold text-slate-800">Próximos Eventos</h3>
                <span className="text-[11px] font-semibold text-[#2563a8] cursor-pointer">Ver todo</span>
              </div>
              <div className="flex flex-col gap-2.5">
                {upcoming.map((u,i)=>(
                  <div key={i} className="flex items-start gap-2.5 p-2.5 rounded-lg bg-slate-50 hover:bg-blue-50 transition-colors cursor-pointer">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-base flex-shrink-0 ${u.c}`}>{u.ico}</div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[12px] font-semibold text-slate-700 truncate">{u.t}</div>
                      <div className="text-[11px] text-slate-400 mt-0.5">{u.d}</div>
                      <div className="text-[11px] text-slate-400">📍 {u.co}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-5">
              <h3 className="text-[14px] font-bold text-slate-800 mb-4">Leyenda</h3>
              {[{c:'#2563a8',l:'Llamadas/Reuniones'},{c:'#7c3aed',l:'Demos'},{c:'#16a34a',l:'Cierres'},{c:'#c8a558',l:'Seguimientos'},{c:'#dc2626',l:'Urgente'}].map(r=>(
                <div key={r.l} className="flex items-center gap-2.5 mb-2">
                  <div className="w-2.5 h-2.5 rounded-full flex-shrink-0"style={{background:r.c}}/>
                  <span className="text-[12px] text-slate-600">{r.l}</span>
                </div>
              ))}
            </div>

            <div className="bg-[#0f2240] rounded-xl p-5">
              <div className="text-[13px] font-bold text-white mb-1">Hoy · 13 Marzo 2026</div>
              <div className="text-[12px] text-slate-400 mb-3">Sin eventos programados</div>
              <button className="w-full flex items-center justify-center gap-2 bg-[rgba(255,255,255,0.1)] text-white text-[12px] font-semibold py-2 rounded-lg hover:bg-[rgba(255,255,255,0.15)]"><IcoPlus/>Agregar evento hoy</button>
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
      <Sidebar/><div className="flex flex-col flex-1 min-w-0"><Header title="Calendario"/><CalendarPage/></div>
    </div>
  );
}
