// ── NexusCRM · Equipo ────────────────────────────────────────
function Badge({color,children}){const c={blue:'bg-blue-100 text-blue-700',green:'bg-green-100 text-green-700',red:'bg-red-100 text-red-700',yellow:'bg-yellow-100 text-yellow-700',orange:'bg-orange-100 text-orange-700',purple:'bg-purple-100 text-purple-700',gray:'bg-slate-100 text-slate-600',navy:'bg-blue-50 text-blue-900',gold:'bg-amber-100 text-amber-800'};return<span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold whitespace-nowrap ${c[color]??c.gray}`}>{children}</span>;}
function Avatar({initials,gradient,size='sm'}){const s={sm:'w-8 h-8 text-xs',md:'w-10 h-10 text-sm',lg:'w-14 h-14 text-lg',xl:'w-16 h-16 text-xl'};return<div className={`${s[size]} rounded-full flex items-center justify-center font-bold text-white flex-shrink-0`}style={{background:gradient??'linear-gradient(135deg,#1a3d6b,#2563a8)'}}>{initials}</div>;}
function IcoSearch(){return<svg width="14"height="14"viewBox="0 0 24 24"fill="none"stroke="currentColor"strokeWidth="2"><circle cx="11"cy="11"r="8"/><line x1="21"y1="21"x2="16.65"y2="16.65"/></svg>}
function IcoPlus(){return<svg width="14"height="14"viewBox="0 0 24 24"fill="none"stroke="currentColor"strokeWidth="2.5"><line x1="12"y1="5"x2="12"y2="19"/><line x1="5"y1="12"x2="19"y2="12"/></svg>}
function IcoBell(){return<svg width="16"height="16"viewBox="0 0 24 24"fill="none"stroke="currentColor"strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>}
function IcoSettings(){return<svg width="15"height="15"viewBox="0 0 24 24"fill="none"stroke="currentColor"strokeWidth="2"><circle cx="12"cy="12"r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>}
function IcoMail(){return<svg width="13"height="13"viewBox="0 0 24 24"fill="none"stroke="currentColor"strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>}
function IcoPhone(){return<svg width="13"height="13"viewBox="0 0 24 24"fill="none"stroke="currentColor"strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.53a2 2 0 0 1 1.97-2.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.16 6.16l1.62-1.62a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>}

const NAV=[
  {g:'Principal',      items:[{l:'Dashboard',a:false,b:null,ico:'📊'}]},
  {g:'Ventas & CRM',   items:[{l:'Contactos',a:false,b:null,ico:'👤'},{l:'Cuentas',a:false,b:null,ico:'🏢'},{l:'Leads',a:false,b:'12',ico:'🎯'},{l:'Oportunidades',a:false,b:null,ico:'💼'},{l:'Actividades',a:false,b:'5',ico:'✅'},{l:'Calendario',a:false,b:null,ico:'📅'}]},
  {g:'Comercial',      items:[{l:'Productos',a:false,b:null,ico:'📦'},{l:'Cotizaciones',a:false,b:'3',ico:'📋'},{l:'Facturas',a:false,b:null,ico:'🧾'}]},
  {g:'Marketing',      items:[{l:'Campañas',a:false,b:null,ico:'📣'}]},
  {g:'Soporte',        items:[{l:'Tickets',a:false,b:'8',ico:'🎫'},{l:'Documentos',a:false,b:null,ico:'📁'}]},
  {g:'Análisis',       items:[{l:'Reportes',a:false,b:null,ico:'📈'}]},
  {g:'Administración', items:[{l:'Equipo',a:true,b:null,ico:'👥'},{l:'Configuración',a:false,b:null,ico:'⚙️'}]},
];
function Sidebar(){return(<aside className="w-[260px] min-h-screen bg-[#0f2240] text-slate-400 flex flex-col flex-shrink-0"><div className="px-5 py-5 border-b border-white/[0.08]"><div className="flex items-center gap-2.5"><div className="w-[34px] h-[34px] rounded-[8px] flex items-center justify-center font-bold text-white"style={{background:'linear-gradient(135deg,#2563a8,#c8a558)'}}>N</div><div><div className="text-[17px] font-bold text-white tracking-[-0.4px]">NexusCRM</div><div className="text-[10px] text-[#c8a558] font-semibold tracking-widest uppercase">Enterprise Suite</div></div></div></div><nav className="flex-1 py-2 overflow-y-auto">{NAV.map(g=>(<div key={g.g}><div className="px-5 pt-4 pb-1.5 text-[10px] font-semibold tracking-[0.1em] uppercase text-slate-600">{g.g}</div>{g.items.map(item=>(<a key={item.l} href="#"className={`flex items-center gap-2.5 px-5 py-[9px] text-[13px] font-medium transition-colors ${item.a?'bg-[rgba(37,99,168,0.35)] text-white border-r-[3px] border-[#c8a558]':'text-slate-400 hover:bg-white/[0.06] hover:text-slate-200'}`}><span>{item.ico}</span><span>{item.l}</span>{item.b&&<span className="ml-auto bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center">{item.b}</span>}</a>))}</div>))}</nav><div className="px-5 py-4 border-t border-white/[0.08]"><div className="flex items-center gap-2.5"><Avatar initials="JM" gradient="linear-gradient(135deg,#c8a558,#a8873a)" size="md"/><div><div className="text-[12px] font-semibold text-slate-200">Juan Martínez</div><div className="text-[11px] text-slate-500">Administrador</div></div><button className="ml-auto text-slate-500"><IcoSettings/></button></div></div></aside>);}
function Header({title}){return(<header className="h-16 bg-white border-b border-slate-200 flex items-center px-6 gap-4 sticky top-0 z-40"><div className="flex items-center gap-1.5 text-[13px] flex-1"><span className="text-[#2563a8] font-medium">NexusCRM</span><span className="text-slate-300">›</span><span className="text-slate-700 font-semibold">{title}</span></div><div className="relative max-w-[280px] w-full"><span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"><IcoSearch/></span><input readOnly placeholder="Buscar miembros…"className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-[13px] bg-slate-50"/></div><div className="flex items-center gap-2"><button className="relative w-9 h-9 flex items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100"><IcoBell/><span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"/></button><Avatar initials="JM" gradient="linear-gradient(135deg,#c8a558,#a8873a)"/></div></header>);}

const team=[
  {n:'Juan Martínez',email:'j.martinez@nexuscrm.com',phone:'+57 310 000 0001',role:'Gerente de Ventas',dept:'Ventas',status:'En línea',sc:'green',init:'JM',g:'linear-gradient(135deg,#c8a558,#a8873a)',deals:22,leads:64,rev:'$114K',rate:'72%',joined:'Ene 2024'},
  {n:'Roberto Pérez',  email:'r.perez@nexuscrm.com',  phone:'+57 312 000 0002',role:'Ejecutivo de Ventas',dept:'Ventas',status:'En línea',sc:'green',init:'RP',g:'linear-gradient(135deg,#2563a8,#1a3d6b)',deals:17,leads:51,rev:'$82K',rate:'58%',joined:'Mar 2024'},
  {n:'Carmen García',  email:'c.garcia@nexuscrm.com', phone:'+57 314 000 0003',role:'Ejecutiva de Ventas',dept:'Ventas',status:'Ausente',sc:'yellow',init:'CG',g:'linear-gradient(135deg,#7c3aed,#5b21b6)',deals:14,leads:43,rev:'$68K',rate:'50%',joined:'Jun 2024'},
  {n:'Diego Morales',  email:'d.morales@nexuscrm.com',phone:'+57 316 000 0004',role:'Especialista Marketing',dept:'Marketing',status:'En línea',sc:'green',init:'DM',g:'linear-gradient(135deg,#0891b2,#0e7490)',deals:0,leads:120,rev:'$0',rate:'—',joined:'Feb 2024'},
  {n:'Laura Sánchez',  email:'l.sanchez@nexuscrm.com',phone:'+57 318 000 0005',role:'Soporte al Cliente',dept:'Soporte',status:'En línea',sc:'green',init:'LS',g:'linear-gradient(135deg,#dc2626,#b91c1c)',deals:0,leads:0,rev:'$0',rate:'94% CSAT',joined:'Abr 2024'},
  {n:'Pablo Ríos',     email:'p.rios@nexuscrm.com',   phone:'+57 320 000 0006',role:'Desarrollador CRM',dept:'Tecnología',status:'No molestar',sc:'red',init:'PR',g:'linear-gradient(135deg,#16a34a,#15803d)',deals:0,leads:0,rev:'$0',rate:'—',joined:'Nov 2023'},
];

function TeamCard({m}){
  return(
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
      <div className="h-20 relative"style={{background:'linear-gradient(135deg,#0f2240,#1a3d6b)'}}>
        <div className="absolute -bottom-7 left-5">
          <Avatar initials={m.init} gradient={m.g} size="xl"/>
        </div>
        <div className="absolute top-3 right-3">
          <span className={`flex items-center gap-1.5 text-[11px] font-semibold px-2 py-0.5 rounded-full ${m.sc==='green'?'bg-green-500/20 text-green-300':m.sc==='yellow'?'bg-yellow-500/20 text-yellow-300':'bg-red-500/20 text-red-300'}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${m.sc==='green'?'bg-green-400':m.sc==='yellow'?'bg-yellow-400':'bg-red-400'}`}/>
            {m.status}
          </span>
        </div>
      </div>
      <div className="pt-9 px-5 pb-5">
        <div className="mb-3">
          <div className="text-[15px] font-bold text-slate-900">{m.n}</div>
          <div className="text-[12px] text-slate-500">{m.role}</div>
          <Badge color={m.dept==='Ventas'?'blue':m.dept==='Marketing'?'purple':m.dept==='Soporte'?'orange':'green'}>{m.dept}</Badge>
        </div>
        <div className="flex flex-col gap-1.5 mb-4">
          <div className="flex items-center gap-1.5 text-[12px] text-slate-400"><IcoMail/><span className="truncate">{m.email}</span></div>
          <div className="flex items-center gap-1.5 text-[12px] text-slate-400"><IcoPhone/>{m.phone}</div>
        </div>
        <div className="grid grid-cols-3 gap-2 pt-3 border-t border-slate-100">
          <div className="text-center"><div className="text-[16px] font-bold text-slate-800">{m.deals}</div><div className="text-[10px] text-slate-400">Tratos</div></div>
          <div className="text-center"><div className="text-[16px] font-bold text-slate-800">{m.leads}</div><div className="text-[10px] text-slate-400">Leads</div></div>
          <div className="text-center"><div className="text-[14px] font-bold text-green-600">{m.rate}</div><div className="text-[10px] text-slate-400">Tasa</div></div>
        </div>
      </div>
    </div>
  );
}

function TeamPage(){
  return(
    <main className="flex-1 overflow-y-auto bg-slate-50">
      <div className="px-7 py-6 flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <div><h1 className="text-[24px] font-bold text-slate-900 tracking-[-0.5px]">Equipo</h1><p className="text-[13px] text-slate-500 mt-0.5">6 miembros · 4 en línea ahora</p></div>
          <div className="flex gap-2">
            <select className="py-2 px-3 border border-slate-200 rounded-lg text-[13px] bg-white text-slate-600"><option>Todos los departamentos</option><option>Ventas</option><option>Marketing</option><option>Soporte</option></select>
            <button className="flex items-center gap-2 bg-[#1a3d6b] text-white text-[13px] font-semibold px-3.5 py-2 rounded-lg"><IcoPlus/>Invitar miembro</button>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4">
          {[
            {l:'Miembros activos',v:'6',c:'#2563a8',bg:'#dbeafe',i:'👥'},
            {l:'En línea ahora',  v:'4',c:'#16a34a',bg:'#dcfce7',i:'🟢'},
            {l:'Tratos este mes', v:'53',c:'#c8a558',bg:'#fef9c3',i:'🏆'},
            {l:'Revenue del equipo',v:'$264K',c:'#7c3aed',bg:'#f3e8ff',i:'💰'},
          ].map(k=>(
            <div key={k.l} className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm relative overflow-hidden"style={{borderTop:`3px solid ${k.c}`}}>
              <div className="absolute top-4 right-4 w-9 h-9 rounded-lg flex items-center justify-center text-base"style={{background:k.bg}}>{k.i}</div>
              <div className="text-[26px] font-bold text-slate-800">{k.v}</div>
              <div className="text-[12px] text-slate-500 font-medium mt-1">{k.l}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-4">
          {team.map((m,i)=><TeamCard key={i} m={m}/>)}
        </div>
      </div>
    </main>
  );
}

export default function Container(){
  return(
    <div className="flex bg-slate-50 font-['Inter',sans-serif]"style={{width:1493,minHeight:900}}tabIndex="-1">
      <Sidebar/><div className="flex flex-col flex-1 min-w-0"><Header title="Equipo"/><TeamPage/></div>
    </div>
  );
}
