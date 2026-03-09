// ── NexusCRM · Configuración ─────────────────────────────────
function Avatar({initials,gradient,size='sm'}){const s={sm:'w-8 h-8 text-xs',md:'w-10 h-10 text-sm',lg:'w-16 h-16 text-xl'};return<div className={`${s[size]} rounded-full flex items-center justify-center font-bold text-white flex-shrink-0`}style={{background:gradient??'linear-gradient(135deg,#1a3d6b,#2563a8)'}}>{initials}</div>;}
function Toggle({on}){return<button className={`relative w-10 h-5 rounded-full transition-colors flex-shrink-0 ${on?'bg-[#1a3d6b]':'bg-slate-200'}`}><span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-all ${on?'left-5':'left-0.5'}`}/></button>;}
function IcoSearch(){return<svg width="14"height="14"viewBox="0 0 24 24"fill="none"stroke="currentColor"strokeWidth="2"><circle cx="11"cy="11"r="8"/><line x1="21"y1="21"x2="16.65"y2="16.65"/></svg>}
function IcoBell(){return<svg width="16"height="16"viewBox="0 0 24 24"fill="none"stroke="currentColor"strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>}
function IcoSettings(){return<svg width="15"height="15"viewBox="0 0 24 24"fill="none"stroke="currentColor"strokeWidth="2"><circle cx="12"cy="12"r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>}
function IcoCheck(){return<svg width="14"height="14"viewBox="0 0 24 24"fill="none"stroke="currentColor"strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>}
function IcoLock(){return<svg width="14"height="14"viewBox="0 0 24 24"fill="none"stroke="currentColor"strokeWidth="2"><rect x="3"y="11"width="18"height="11"rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>}
function IcoUser(){return<svg width="14"height="14"viewBox="0 0 24 24"fill="none"stroke="currentColor"strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12"cy="7"r="4"/></svg>}

const NAV=[
  {g:'Principal',      items:[{l:'Dashboard',a:false,b:null,ico:'📊'}]},
  {g:'Ventas & CRM',   items:[{l:'Contactos',a:false,b:null,ico:'👤'},{l:'Cuentas',a:false,b:null,ico:'🏢'},{l:'Leads',a:false,b:'12',ico:'🎯'},{l:'Oportunidades',a:false,b:null,ico:'💼'},{l:'Actividades',a:false,b:'5',ico:'✅'},{l:'Calendario',a:false,b:null,ico:'📅'}]},
  {g:'Comercial',      items:[{l:'Productos',a:false,b:null,ico:'📦'},{l:'Cotizaciones',a:false,b:'3',ico:'📋'},{l:'Facturas',a:false,b:null,ico:'🧾'}]},
  {g:'Marketing',      items:[{l:'Campañas',a:false,b:null,ico:'📣'}]},
  {g:'Soporte',        items:[{l:'Tickets',a:false,b:'8',ico:'🎫'},{l:'Documentos',a:false,b:null,ico:'📁'}]},
  {g:'Análisis',       items:[{l:'Reportes',a:false,b:null,ico:'📈'}]},
  {g:'Administración', items:[{l:'Equipo',a:false,b:null,ico:'👥'},{l:'Configuración',a:true,b:null,ico:'⚙️'}]},
];
function Sidebar(){return(<aside className="w-[260px] min-h-screen bg-[#0f2240] text-slate-400 flex flex-col flex-shrink-0"><div className="px-5 py-5 border-b border-white/[0.08]"><div className="flex items-center gap-2.5"><div className="w-[34px] h-[34px] rounded-[8px] flex items-center justify-center font-bold text-white"style={{background:'linear-gradient(135deg,#2563a8,#c8a558)'}}>N</div><div><div className="text-[17px] font-bold text-white tracking-[-0.4px]">NexusCRM</div><div className="text-[10px] text-[#c8a558] font-semibold tracking-widest uppercase">Enterprise Suite</div></div></div></div><nav className="flex-1 py-2 overflow-y-auto">{NAV.map(g=>(<div key={g.g}><div className="px-5 pt-4 pb-1.5 text-[10px] font-semibold tracking-[0.1em] uppercase text-slate-600">{g.g}</div>{g.items.map(item=>(<a key={item.l} href="#"className={`flex items-center gap-2.5 px-5 py-[9px] text-[13px] font-medium transition-colors ${item.a?'bg-[rgba(37,99,168,0.35)] text-white border-r-[3px] border-[#c8a558]':'text-slate-400 hover:bg-white/[0.06] hover:text-slate-200'}`}><span>{item.ico}</span><span>{item.l}</span>{item.b&&<span className="ml-auto bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center">{item.b}</span>}</a>))}</div>))}</nav><div className="px-5 py-4 border-t border-white/[0.08]"><div className="flex items-center gap-2.5"><Avatar initials="JM" gradient="linear-gradient(135deg,#c8a558,#a8873a)"/><div><div className="text-[12px] font-semibold text-slate-200">Juan Martínez</div><div className="text-[11px] text-slate-500">Administrador</div></div><button className="ml-auto text-slate-500"><IcoSettings/></button></div></div></aside>);}
function Header({title}){return(<header className="h-16 bg-white border-b border-slate-200 flex items-center px-6 gap-4 sticky top-0 z-40"><div className="flex items-center gap-1.5 text-[13px] flex-1"><span className="text-[#2563a8] font-medium">NexusCRM</span><span className="text-slate-300">›</span><span className="text-slate-700 font-semibold">{title}</span></div><div className="relative max-w-[280px] w-full"><span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"><IcoSearch/></span><input readOnly placeholder="Buscar configuración…"className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-[13px] bg-slate-50"/></div><div className="flex items-center gap-2"><button className="relative w-9 h-9 flex items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100"><IcoBell/><span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"/></button><Avatar initials="JM" gradient="linear-gradient(135deg,#c8a558,#a8873a)"/></div></header>);}

const SECTION_TABS=['General','Perfil','Usuarios','Integraciones','Notificaciones','Seguridad'];

function Field({label,val,type='text',hint}){
  return(
    <div>
      <label className="block text-[12px] font-semibold text-slate-700 mb-1.5">{label}</label>
      <input readOnly defaultValue={val} type={type} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-[13px] bg-white text-slate-700 focus:outline-none"/>
      {hint&&<p className="text-[11px] text-slate-400 mt-1">{hint}</p>}
    </div>
  );
}

function IntCard({ico,name,status,desc,on}){
  return(
    <div className="bg-white border border-slate-200 rounded-xl p-5 flex items-start gap-4">
      <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center text-2xl flex-shrink-0">{ico}</div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1">
          <div className="text-[13px] font-bold text-slate-800">{name}</div>
          <Toggle on={on}/>
        </div>
        <div className="text-[12px] text-slate-500">{desc}</div>
        <span className={`inline-flex items-center gap-1 text-[11px] font-semibold mt-1.5 ${on?'text-green-600':'text-slate-400'}`}><span className={`w-1.5 h-1.5 rounded-full ${on?'bg-green-500':'bg-slate-300'}`}/>{on?'Conectado':'Desconectado'}</span>
      </div>
    </div>
  );
}

function SettingsPage(){
  const [tab,setTab]=React.useState('General');
  return(
    <main className="flex-1 overflow-y-auto bg-slate-50">
      <div className="px-7 py-6 flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <div><h1 className="text-[24px] font-bold text-slate-900 tracking-[-0.5px]">Configuración</h1><p className="text-[13px] text-slate-500 mt-0.5">Gestiona tu cuenta, equipo y preferencias</p></div>
        </div>

        <div className="flex gap-6">
          {/* Tab sidebar */}
          <div className="w-[220px] flex-shrink-0">
            <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
              {SECTION_TABS.map(t=>(
                <button key={t} onClick={()=>setTab(t)} className={`w-full flex items-center gap-2.5 px-4 py-3 text-[13px] font-medium text-left border-b border-slate-50 last:border-0 transition-colors ${tab===t?'bg-[#eef4ff] text-[#1a3d6b] font-semibold':'text-slate-600 hover:bg-slate-50'}`}>
                  <span>{tab===t&&<span className="inline-block w-1.5 h-1.5 bg-[#c8a558] rounded-full mr-1"/>}{t}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0 flex flex-col gap-5">

            {tab==='General'&&(
              <>
                <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6">
                  <h3 className="text-[15px] font-bold text-slate-800 mb-4">Información de la Organización</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <Field label="Nombre de la empresa" val="NexusCRM Inc."/>
                    <Field label="Dominio web" val="nexuscrm.com"/>
                    <Field label="Zona horaria" val="América/Bogotá (UTC-5)"/>
                    <Field label="Idioma" val="Español (Colombia)"/>
                    <Field label="Moneda" val="USD – Dólar estadounidense"/>
                    <Field label="Formato de fecha" val="DD/MM/YYYY"/>
                  </div>
                  <div className="flex justify-end mt-5"><button className="flex items-center gap-2 bg-[#1a3d6b] text-white text-[13px] font-semibold px-4 py-2 rounded-lg"><IcoCheck/>Guardar cambios</button></div>
                </div>
                <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6">
                  <h3 className="text-[15px] font-bold text-slate-800 mb-4">Apariencia</h3>
                  <div className="flex gap-3">
                    {[{l:'Claro',i:'☀️',active:true},{l:'Oscuro',i:'🌙',active:false},{l:'Sistema',i:'💻',active:false}].map(m=>(
                      <button key={m.l} className={`flex-1 flex flex-col items-center gap-2 py-4 rounded-xl border-2 transition-all ${m.active?'border-[#1a3d6b] bg-[#eef4ff]':'border-slate-200 hover:border-slate-300'}`}>
                        <span className="text-2xl">{m.i}</span>
                        <span className={`text-[12px] font-semibold ${m.active?'text-[#1a3d6b]':'text-slate-500'}`}>{m.l}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}

            {tab==='Perfil'&&(
              <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6">
                <h3 className="text-[15px] font-bold text-slate-800 mb-5">Mi Perfil</h3>
                <div className="flex items-center gap-5 mb-6 pb-5 border-b border-slate-100">
                  <Avatar initials="JM" gradient="linear-gradient(135deg,#c8a558,#a8873a)" size="lg"/>
                  <div>
                    <div className="text-[15px] font-bold text-slate-800">Juan Martínez</div>
                    <div className="text-[13px] text-slate-500">Administrador · NexusCRM Inc.</div>
                    <button className="mt-2 text-[12px] font-semibold text-[#2563a8]">Cambiar foto</button>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Field label="Nombre" val="Juan"/>
                  <Field label="Apellido" val="Martínez"/>
                  <Field label="Email" val="j.martinez@nexuscrm.com" type="email"/>
                  <Field label="Teléfono" val="+57 310 000 0001" type="tel"/>
                  <Field label="Cargo" val="Gerente de Ventas"/>
                  <Field label="Departamento" val="Ventas"/>
                </div>
                <div className="flex justify-end mt-5"><button className="flex items-center gap-2 bg-[#1a3d6b] text-white text-[13px] font-semibold px-4 py-2 rounded-lg"><IcoCheck/>Guardar perfil</button></div>
              </div>
            )}

            {tab==='Usuarios'&&(
              <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
                <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
                  <h3 className="text-[15px] font-bold text-slate-800">Usuarios del Sistema</h3>
                  <button className="flex items-center gap-2 bg-[#1a3d6b] text-white text-[12px] font-semibold px-3 py-1.5 rounded-lg">+ Invitar usuario</button>
                </div>
                <table className="w-full">
                  <thead><tr className="bg-slate-50">{['Usuario','Email','Rol','Estado','Último acceso',''].map(h=><th key={h} className="px-5 py-2.5 text-left text-[11px] font-semibold text-slate-400 uppercase tracking-wide">{h}</th>)}</tr></thead>
                  <tbody className="divide-y divide-slate-50">
                    {[{n:'Juan Martínez',e:'j.martinez@nexuscrm.com',r:'Admin',s:'Activo',la:'Ahora',i:'JM',g:'linear-gradient(135deg,#c8a558,#a8873a)'},
                      {n:'Roberto Pérez',e:'r.perez@nexuscrm.com',r:'Ventas',s:'Activo',la:'Hace 2h',i:'RP',g:'linear-gradient(135deg,#2563a8,#1a3d6b)'},
                      {n:'Carmen García',e:'c.garcia@nexuscrm.com',r:'Ventas',s:'Activo',la:'Hoy',i:'CG',g:'linear-gradient(135deg,#7c3aed,#5b21b6)'},
                      {n:'Diego Morales',e:'d.morales@nexuscrm.com',r:'Marketing',s:'Activo',la:'Ayer',i:'DM',g:'linear-gradient(135deg,#0891b2,#0e7490)'},
                      {n:'Laura Sánchez',e:'l.sanchez@nexuscrm.com',r:'Soporte',s:'Activo',la:'Hoy',i:'LS',g:'linear-gradient(135deg,#dc2626,#b91c1c)'},
                      {n:'Pablo Ríos',e:'p.rios@nexuscrm.com',r:'Técnico',s:'Inactivo',la:'Hace 3d',i:'PR',g:'linear-gradient(135deg,#16a34a,#15803d)'},
                    ].map((u,i)=>(
                      <tr key={i} className="hover:bg-slate-50">
                        <td className="px-5 py-3"><div className="flex items-center gap-2.5"><Avatar initials={u.i} gradient={u.g}/><span className="text-[13px] font-semibold text-slate-800">{u.n}</span></div></td>
                        <td className="px-5 py-3 text-[13px] text-slate-500">{u.e}</td>
                        <td className="px-5 py-3"><span className="px-2 py-0.5 bg-blue-50 text-blue-700 text-[11px] font-semibold rounded-full">{u.r}</span></td>
                        <td className="px-5 py-3"><span className={`w-2 h-2 rounded-full inline-block mr-1.5 ${u.s==='Activo'?'bg-green-500':'bg-slate-300'}`}/><span className="text-[13px] text-slate-600">{u.s}</span></td>
                        <td className="px-5 py-3 text-[12px] text-slate-400">{u.la}</td>
                        <td className="px-5 py-3"><button className="text-[12px] text-[#2563a8] font-semibold">Editar</button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {tab==='Integraciones'&&(
              <div className="flex flex-col gap-4">
                <h3 className="text-[15px] font-bold text-slate-800">Integraciones Disponibles</h3>
                <div className="grid grid-cols-2 gap-4">
                  <IntCard ico="📧" name="Gmail / Google Workspace" desc="Sincroniza emails y calendario con tu cuenta de Google." on={true}/>
                  <IntCard ico="💼" name="LinkedIn Sales Navigator" desc="Importa leads y perfiles directamente desde LinkedIn." on={true}/>
                  <IntCard ico="📞" name="Twilio (Llamadas/SMS)" desc="Registra llamadas y envía SMS desde el CRM." on={false}/>
                  <IntCard ico="💳" name="Stripe / Pagos" desc="Conecta tu pasarela de pago para facturas automáticas." on={false}/>
                  <IntCard ico="📊" name="Google Analytics" desc="Integra datos de tráfico web con tus reportes de leads." on={true}/>
                  <IntCard ico="🔗" name="Zapier / Webhooks" desc="Conecta con miles de apps usando automatizaciones." on={false}/>
                </div>
              </div>
            )}

            {tab==='Notificaciones'&&(
              <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6">
                <h3 className="text-[15px] font-bold text-slate-800 mb-5">Preferencias de Notificaciones</h3>
                {[
                  {g:'Ventas',items:[{l:'Nuevo lead asignado',on:true},{l:'Oportunidad actualizada',on:true},{l:'Trato cerrado',on:true}]},
                  {g:'Actividades',items:[{l:'Recordatorio de tarea',on:true},{l:'Reunión próxima (30 min)',on:true},{l:'Actividad vencida',on:false}]},
                  {g:'Sistema',items:[{l:'Nueva factura generada',on:false},{l:'Ticket soporte urgente',on:true},{l:'Reporte semanal',on:true}]},
                ].map(grp=>(
                  <div key={grp.g} className="mb-5">
                    <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wide mb-3">{grp.g}</div>
                    {grp.items.map(it=>(
                      <div key={it.l} className="flex items-center justify-between py-3 border-b border-slate-50">
                        <span className="text-[13px] text-slate-700">{it.l}</span>
                        <Toggle on={it.on}/>
                      </div>
                    ))}
                  </div>
                ))}
                <div className="flex justify-end mt-2"><button className="flex items-center gap-2 bg-[#1a3d6b] text-white text-[13px] font-semibold px-4 py-2 rounded-lg"><IcoCheck/>Guardar preferencias</button></div>
              </div>
            )}

            {tab==='Seguridad'&&(
              <div className="flex flex-col gap-4">
                <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6">
                  <h3 className="text-[15px] font-bold text-slate-800 mb-4">Cambiar Contraseña</h3>
                  <div className="flex flex-col gap-3 max-w-md">
                    <Field label="Contraseña actual" val="••••••••••••" type="password"/>
                    <Field label="Nueva contraseña" val="" type="password" hint="Mínimo 12 caracteres, 1 mayúscula y 1 símbolo"/>
                    <Field label="Confirmar nueva contraseña" val="" type="password"/>
                  </div>
                  <button className="mt-4 flex items-center gap-2 bg-[#1a3d6b] text-white text-[13px] font-semibold px-4 py-2 rounded-lg"><IcoLock/>Actualizar contraseña</button>
                </div>
                <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6">
                  <h3 className="text-[15px] font-bold text-slate-800 mb-4">Autenticación de dos factores</h3>
                  <div className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-xl">
                    <div className="flex items-center gap-3"><div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center text-green-600">🛡️</div><div><div className="text-[13px] font-bold text-green-800">2FA Activado</div><div className="text-[12px] text-green-600">Aplicación autenticadora configurada</div></div></div>
                    <button className="text-[12px] font-semibold text-red-600">Desactivar</button>
                  </div>
                </div>
                <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6">
                  <h3 className="text-[15px] font-bold text-slate-800 mb-4">Sesiones Activas</h3>
                  {[{d:'Chrome · Mac OS',l:'Bogotá, Colombia',t:'Activo ahora',c:'text-green-600'},{d:'Safari · iPhone',l:'Bogotá, Colombia',t:'Hace 2h',c:'text-slate-400'},{d:'Chrome · Windows',l:'Medellín, Colombia',t:'Hace 1d',c:'text-slate-400'}].map((s,i)=>(
                    <div key={i} className="flex items-center justify-between py-3 border-b border-slate-50 last:border-0">
                      <div className="flex items-center gap-3"><span className="text-xl">💻</span><div><div className="text-[13px] font-semibold text-slate-800">{s.d}</div><div className="text-[11px] text-slate-400">{s.l}</div></div></div>
                      <div className="flex items-center gap-3"><span className={`text-[12px] font-medium ${s.c}`}>{s.t}</span>{i>0&&<button className="text-[11px] font-semibold text-red-500">Cerrar</button>}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

export default function Container(){
  return(
    <div className="flex bg-slate-50 font-['Inter',sans-serif]"style={{width:1493,minHeight:900}}tabIndex="-1">
      <Sidebar/><div className="flex flex-col flex-1 min-w-0"><Header title="Configuración"/><SettingsPage/></div>
    </div>
  );
}
