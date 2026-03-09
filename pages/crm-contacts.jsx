// ── NexusCRM · Contactos ──────────────────────────────────────
function Badge({color,children}){const c={blue:'bg-blue-100 text-blue-700',green:'bg-green-100 text-green-700',red:'bg-red-100 text-red-700',yellow:'bg-yellow-100 text-yellow-700',orange:'bg-orange-100 text-orange-700',purple:'bg-purple-100 text-purple-700',gray:'bg-slate-100 text-slate-600',navy:'bg-blue-50 text-blue-900',gold:'bg-amber-100 text-amber-800'};return<span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold whitespace-nowrap ${c[color]??c.gray}`}>{children}</span>;}
function Avatar({initials,gradient,size='sm'}){const s={sm:'w-8 h-8 text-xs',md:'w-10 h-10 text-sm',lg:'w-12 h-12 text-base'};return<div className={`${s[size]} rounded-full flex items-center justify-center font-bold text-white flex-shrink-0`}style={{background:gradient??'linear-gradient(135deg,#1a3d6b,#2563a8)'}}>{initials}</div>;}
function IcoSearch(){return<svg width="14"height="14"viewBox="0 0 24 24"fill="none"stroke="currentColor"strokeWidth="2"><circle cx="11"cy="11"r="8"/><line x1="21"y1="21"x2="16.65"y2="16.65"/></svg>}
function IcoPlus(){return<svg width="14"height="14"viewBox="0 0 24 24"fill="none"stroke="currentColor"strokeWidth="2.5"><line x1="12"y1="5"x2="12"y2="19"/><line x1="5"y1="12"x2="19"y2="12"/></svg>}
function IcoMore(){return<svg width="15"height="15"viewBox="0 0 24 24"fill="none"stroke="currentColor"strokeWidth="2"><circle cx="5"cy="12"r="1"/><circle cx="12"cy="12"r="1"/><circle cx="19"cy="12"r="1"/></svg>}
function IcoBell(){return<svg width="16"height="16"viewBox="0 0 24 24"fill="none"stroke="currentColor"strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>}
function IcoSettings(){return<svg width="15"height="15"viewBox="0 0 24 24"fill="none"stroke="currentColor"strokeWidth="2"><circle cx="12"cy="12"r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>}
function IcoMail(){return<svg width="13"height="13"viewBox="0 0 24 24"fill="none"stroke="currentColor"strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>}
function IcoPhone(){return<svg width="13"height="13"viewBox="0 0 24 24"fill="none"stroke="currentColor"strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.53a2 2 0 0 1 1.97-2.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.16 6.16l1.62-1.62a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>}
function IcoDownload(){return<svg width="14"height="14"viewBox="0 0 24 24"fill="none"stroke="currentColor"strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12"y1="15"x2="12"y2="3"/></svg>}
function IcoFilter(){return<svg width="14"height="14"viewBox="0 0 24 24"fill="none"stroke="currentColor"strokeWidth="2"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>}

const NAV=[
  {g:'Principal',      items:[{l:'Dashboard',    a:false,b:null,ico:'📊'}]},
  {g:'Ventas & CRM',   items:[{l:'Contactos',    a:true, b:null,ico:'👤'},{l:'Cuentas',      a:false,b:null,ico:'🏢'},{l:'Leads',    a:false,b:'12',ico:'🎯'},{l:'Oportunidades',a:false,b:null,ico:'💼'},{l:'Actividades',a:false,b:'5',ico:'✅'},{l:'Calendario',a:false,b:null,ico:'📅'}]},
  {g:'Comercial',      items:[{l:'Productos',    a:false,b:null,ico:'📦'},{l:'Cotizaciones', a:false,b:'3', ico:'📋'},{l:'Facturas',   a:false,b:null,ico:'🧾'}]},
  {g:'Marketing',      items:[{l:'Campañas',     a:false,b:null,ico:'📣'}]},
  {g:'Soporte',        items:[{l:'Tickets',      a:false,b:'8', ico:'🎫'},{l:'Documentos',   a:false,b:null,ico:'📁'}]},
  {g:'Análisis',       items:[{l:'Reportes',     a:false,b:null,ico:'📈'}]},
  {g:'Administración', items:[{l:'Equipo',       a:false,b:null,ico:'👥'},{l:'Configuración',a:false,b:null,ico:'⚙️'}]},
];

function Sidebar(){
  return(
    <aside className="w-[260px] min-h-screen bg-[#0f2240] text-slate-400 flex flex-col flex-shrink-0">
      <div className="px-5 py-5 border-b border-white/[0.08]">
        <div className="flex items-center gap-2.5">
          <div className="w-[34px] h-[34px] rounded-[8px] flex items-center justify-center font-bold text-white" style={{background:'linear-gradient(135deg,#2563a8,#c8a558)'}}>N</div>
          <div><div className="text-[17px] font-bold text-white tracking-[-0.4px]">NexusCRM</div><div className="text-[10px] text-[#c8a558] font-semibold tracking-widest uppercase">Enterprise Suite</div></div>
        </div>
      </div>
      <nav className="flex-1 py-2 overflow-y-auto">
        {NAV.map(g=>(
          <div key={g.g}>
            <div className="px-5 pt-4 pb-1.5 text-[10px] font-semibold tracking-[0.1em] uppercase text-slate-600">{g.g}</div>
            {g.items.map(item=>(
              <a key={item.l} href="#" className={`flex items-center gap-2.5 px-5 py-[9px] text-[13px] font-medium transition-colors ${item.a?'bg-[rgba(37,99,168,0.35)] text-white border-r-[3px] border-[#c8a558]':'text-slate-400 hover:bg-white/[0.06] hover:text-slate-200'}`}>
                <span>{item.ico}</span><span>{item.l}</span>
                {item.b&&<span className="ml-auto bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center">{item.b}</span>}
              </a>
            ))}
          </div>
        ))}
      </nav>
      <div className="px-5 py-4 border-t border-white/[0.08]">
        <div className="flex items-center gap-2.5">
          <Avatar initials="JM" gradient="linear-gradient(135deg,#c8a558,#a8873a)"/>
          <div><div className="text-[12px] font-semibold text-slate-200">Juan Martínez</div><div className="text-[11px] text-slate-500">Administrador</div></div>
          <button className="ml-auto text-slate-500"><IcoSettings/></button>
        </div>
      </div>
    </aside>
  );
}

function Header({title}){
  return(
    <header className="h-16 bg-white border-b border-slate-200 flex items-center px-6 gap-4 sticky top-0 z-40">
      <div className="flex items-center gap-1.5 text-[13px] flex-1">
        <span className="text-[#2563a8] font-medium">NexusCRM</span>
        <span className="text-slate-300">›</span>
        <span className="text-slate-700 font-semibold">{title}</span>
      </div>
      <div className="relative max-w-[280px] w-full">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"><IcoSearch/></span>
        <input readOnly placeholder={`Buscar ${title.toLowerCase()}…`} className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-[13px] bg-slate-50"/>
      </div>
      <div className="flex items-center gap-2">
        <button className="relative w-9 h-9 flex items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100">
          <IcoBell/><span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"/>
        </button>
        <Avatar initials="JM" gradient="linear-gradient(135deg,#c8a558,#a8873a)"/>
      </div>
    </header>
  );
}

function KPI({label,value,color,bg,icon}){
  return(
    <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm relative overflow-hidden" style={{borderTop:`3px solid ${color}`}}>
      <div className="absolute top-4 right-4 w-9 h-9 rounded-lg flex items-center justify-center text-base" style={{background:bg}}>{icon}</div>
      <div className="text-[26px] font-bold text-slate-800 leading-tight">{value}</div>
      <div className="text-[12px] text-slate-500 font-medium mt-1">{label}</div>
    </div>
  );
}

const contacts=[
  {name:'Carlos Ruiz',      co:'Tecno S.A.',     email:'c.ruiz@tecno.com',       phone:'+57 310 555 0101',status:'Activo',   bc:'green', last:'Hace 1h'},
  {name:'Ana López',        co:'Innova LLC',     email:'a.lopez@innova.com',     phone:'+57 314 555 0202',status:'Activo',   bc:'green', last:'Ayer'},
  {name:'Pedro Vargas',     co:'GlobalNet',      email:'p.vargas@global.com',    phone:'+57 320 555 0303',status:'Prospecto',bc:'blue',  last:'Hace 3d'},
  {name:'María Fernández',  co:'DataPoint S.A.', email:'m.fern@data.com',        phone:'+57 318 555 0404',status:'Activo',   bc:'green', last:'Hace 2h'},
  {name:'Luis Torres',      co:'MegaTrade',      email:'l.torres@mega.com',      phone:'+57 315 555 0505',status:'Inactivo', bc:'gray',  last:'Hace 1 sem'},
  {name:'Sofía Méndez',     co:'NetSol',         email:'s.mendez@netsol.com',    phone:'+57 317 555 0606',status:'Activo',   bc:'green', last:'Hoy'},
  {name:'Roberto Gómez',    co:'TechPlus',       email:'r.gomez@techplus.com',   phone:'+57 316 555 0707',status:'Prospecto',bc:'blue',  last:'Hace 2d'},
  {name:'Laura Jiménez',    co:'Alpha Corp',     email:'l.jimenez@alpha.com',    phone:'+57 312 555 0808',status:'Activo',   bc:'green', last:'Hace 4h'},
];

function ContactsPage(){
  return(
    <main className="flex-1 overflow-y-auto bg-slate-50">
      <div className="px-7 py-6 flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-[24px] font-bold text-slate-900 tracking-[-0.5px]">Contactos</h1>
            <p className="text-[13px] text-slate-500 mt-0.5">1,248 contactos en total</p>
          </div>
          <div className="flex gap-2">
            <button className="flex items-center gap-2 bg-white border border-slate-200 text-slate-600 text-[13px] font-medium px-3.5 py-2 rounded-lg"><IcoDownload/>Exportar</button>
            <button className="flex items-center gap-2 bg-[#1a3d6b] text-white text-[13px] font-semibold px-3.5 py-2 rounded-lg"><IcoPlus/>Nuevo contacto</button>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4">
          <KPI label="Total contactos"  value="1,248" color="#2563a8" bg="#dbeafe" icon="👤"/>
          <KPI label="Activos"          value="986"   color="#16a34a" bg="#dcfce7" icon="✅"/>
          <KPI label="Nuevos este mes"  value="47"    color="#c8a558" bg="#fef9c3" icon="🆕"/>
          <KPI label="Sin actividad"    value="83"    color="#dc2626" bg="#fee2e2" icon="⏰"/>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <div className="relative flex-1 max-w-[320px]">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"><IcoSearch/></span>
            <input readOnly placeholder="Buscar nombre, empresa, email…" className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-[13px] bg-white"/>
          </div>
          <select className="py-2 px-3 border border-slate-200 rounded-lg text-[13px] bg-white text-slate-600"><option>Todos los estados</option><option>Activo</option><option>Prospecto</option><option>Inactivo</option></select>
          <select className="py-2 px-3 border border-slate-200 rounded-lg text-[13px] bg-white text-slate-600"><option>Todas las empresas</option><option>Tecno S.A.</option><option>Innova LLC</option></select>
          <button className="flex items-center gap-2 bg-white border border-slate-200 text-slate-600 text-[13px] px-3.5 py-2 rounded-lg"><IcoFilter/>Filtros</button>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
            <h3 className="text-[14px] font-bold text-slate-800">Lista de Contactos</h3>
            <div className="flex items-center gap-2">
              <span className="text-[12px] text-slate-400">Mostrando 8 de 1,248</span>
              <button className="w-7 h-7 border border-slate-200 rounded text-slate-400 text-[12px]">‹</button>
              <button className="w-7 h-7 border border-slate-200 rounded text-slate-400 text-[12px]">›</button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50">
                  {['Nombre','Empresa','Email','Teléfono','Estado','Última actividad',''].map(h=>(
                    <th key={h} className="px-5 py-2.5 text-left text-[11px] font-semibold text-slate-400 uppercase tracking-wide whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {contacts.map(c=>(
                  <tr key={c.name} className="hover:bg-slate-50 transition-colors">
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-2.5">
                        <Avatar initials={c.name.split(' ').map(w=>w[0]).join('').slice(0,2)} gradient="linear-gradient(135deg,#2563a8,#1a3d6b)"/>
                        <span className="text-[13px] font-semibold text-slate-800">{c.name}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3 text-[13px] text-slate-600">{c.co}</td>
                    <td className="px-5 py-3"><div className="flex items-center gap-1.5 text-[13px] text-slate-600"><span className="text-slate-400"><IcoMail/></span>{c.email}</div></td>
                    <td className="px-5 py-3"><div className="flex items-center gap-1.5 text-[13px] text-slate-600"><span className="text-slate-400"><IcoPhone/></span>{c.phone}</div></td>
                    <td className="px-5 py-3"><Badge color={c.bc}>{c.status}</Badge></td>
                    <td className="px-5 py-3 text-[12px] text-slate-400">{c.last}</td>
                    <td className="px-5 py-3"><button className="text-slate-400 hover:text-slate-600"><IcoMore/></button></td>
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
    <div className="flex bg-slate-50 font-['Inter',sans-serif]" style={{width:1493,minHeight:900}} tabIndex="-1">
      <Sidebar/>
      <div className="flex flex-col flex-1 min-w-0">
        <Header title="Contactos"/>
        <ContactsPage/>
      </div>
    </div>
  );
}
