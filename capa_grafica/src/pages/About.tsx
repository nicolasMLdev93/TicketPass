import {
  FiCalendar,
  FiCode,
  FiDatabase,
  FiServer,
  FiLayers,
  FiShield,
  FiLock,
  FiLayout,
  FiCheckCircle,
  FiGitBranch,
} from "react-icons/fi";
import Logo from "../icons/logo";

export default function About() {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-1">
          Sobre Ticket Pass
        </h1>

        <p className="text-neutral-400 text-sm">
          Una aplicación full stack desarrollada para integrar distintas
          tecnologías en un único sistema.
        </p>
      </div>

      <div className="bg-neutral-950 border border-neutral-800 rounded-2xl overflow-hidden hover:border-amber-400/30 transition-colors">
        <div className="h-px bg-gradient-to-r from-transparent via-amber-400/60 to-transparent" />

        <div className="p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:items-center gap-6 pb-8 border-b border-neutral-800">
           
              <Logo/>
            

            <div>
           

              <p className="text-neutral-400 text-sm leading-relaxed max-w-3xl">
                Ticket Pass es una aplicación de gestión de eventos y reservas
                desarrollada por{" "}
                <span className="text-white font-medium">Nicolás Bauzá</span>.
                El proyecto fue creado como una experiencia práctica de
                desarrollo full stack, buscando integrar frontend, backend,
                bases de datos, autenticación y seguridad dentro de una misma
                aplicación.
              </p>
            </div>
          </div>

          <div className="py-8">
            <div className="max-w-3xl space-y-4 text-sm text-neutral-400 leading-relaxed">
              <h3 className="text-lg font-bold text-white mb-4">
                Una idea llevada de principio a fin
              </h3>

              <p>
                La idea detrás de Ticket Pass comenzó con algo sencillo:
                permitir que una persona pueda descubrir un evento, reservar sus
                entradas y consultar sus reservas desde un mismo lugar. Sin
                embargo, transformar esa idea en una aplicación funcional
                implicó construir mucho más que una interfaz.
              </p>

              <p>
                Cada acción que realiza el usuario desencadena un recorrido por
                diferentes capas del sistema. El frontend se comunica con el
                backend mediante APIs, el backend procesa la lógica de negocio y
                Sequelize ORM se encarga de trabajar con la base de datos
                utilizando modelos y relaciones.
              </p>

              <p>
                Al mismo tiempo, la autenticación y la protección de las cuentas
                forman parte fundamental del sistema. JWT permite gestionar las
                sesiones autenticadas, mientras que bcrypt se utiliza para
                proteger las contraseñas antes de almacenarlas.
              </p>

              <p>
                El resultado es un proyecto que busca representar una aplicación
                real, donde cada tecnología cumple una función concreta y todas
                las piezas trabajan juntas para ofrecer una experiencia
                coherente al usuario.
              </p>
            </div>
          </div>

          <div className="pt-7 border-t border-neutral-800">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-9 h-9 rounded-lg bg-amber-400/10 border border-amber-400/20 flex items-center justify-center">
                <FiLayers className="w-4 h-4 text-amber-400" />
              </div>

              <div>
                <h3 className="text-lg font-bold text-white">
                  Tecnologías utilizadas
                </h3>

                <p className="text-neutral-500 text-xs">
                  Las herramientas que hacen posible Ticket Pass.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-5 hover:border-amber-400/30 transition-colors">
                <div className="w-10 h-10 rounded-lg bg-neutral-800 flex items-center justify-center mb-4">
                  <FiCode className="w-5 h-5 text-amber-400" />
                </div>

                <h4 className="text-white font-semibold text-sm mb-2">React</h4>

                <p className="text-neutral-500 text-xs leading-relaxed">
                  Utilizado para construir la interfaz de usuario y desarrollar
                  una experiencia dinámica y modular.
                </p>
              </div>

              <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-5 hover:border-amber-400/30 transition-colors">
                <div className="w-10 h-10 rounded-lg bg-neutral-800 flex items-center justify-center mb-4">
                  <FiServer className="w-5 h-5 text-amber-400" />
                </div>

                <h4 className="text-white font-semibold text-sm mb-2">
                  Node.js
                </h4>

                <p className="text-neutral-500 text-xs leading-relaxed">
                  Entorno utilizado para ejecutar el backend y gestionar la
                  lógica del servidor.
                </p>
              </div>

              <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-5 hover:border-amber-400/30 transition-colors">
                <div className="w-10 h-10 rounded-lg bg-neutral-800 flex items-center justify-center mb-4">
                  <FiGitBranch className="w-5 h-5 text-amber-400" />
                </div>

                <h4 className="text-white font-semibold text-sm mb-2">
                  Express
                </h4>

                <p className="text-neutral-500 text-xs leading-relaxed">
                  Framework utilizado para crear las APIs REST y gestionar las
                  diferentes rutas del backend.
                </p>
              </div>

              <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-5 hover:border-amber-400/30 transition-colors">
                <div className="w-10 h-10 rounded-lg bg-neutral-800 flex items-center justify-center mb-4">
                  <FiDatabase className="w-5 h-5 text-amber-400" />
                </div>

                <h4 className="text-white font-semibold text-sm mb-2">
                  Sequelize ORM
                </h4>

                <p className="text-neutral-500 text-xs leading-relaxed">
                  ORM utilizado para trabajar con la base de datos mediante
                  modelos, relaciones, migraciones y consultas.
                </p>
              </div>

              <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-5 hover:border-amber-400/30 transition-colors">
                <div className="w-10 h-10 rounded-lg bg-neutral-800 flex items-center justify-center mb-4">
                  <FiShield className="w-5 h-5 text-amber-400" />
                </div>

                <h4 className="text-white font-semibold text-sm mb-2">JWT</h4>

                <p className="text-neutral-500 text-xs leading-relaxed">
                  Utilizado para la autenticación mediante tokens y la
                  protección de los recursos privados de la aplicación.
                </p>
              </div>

              <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-5 hover:border-amber-400/30 transition-colors">
                <div className="w-10 h-10 rounded-lg bg-neutral-800 flex items-center justify-center mb-4">
                  <FiLock className="w-5 h-5 text-amber-400" />
                </div>

                <h4 className="text-white font-semibold text-sm mb-2">
                  bcrypt
                </h4>

                <p className="text-neutral-500 text-xs leading-relaxed">
                  Utilizado para aplicar hashing a las contraseñas y evitar
                  almacenar credenciales en texto plano.
                </p>
              </div>

              <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-5 hover:border-amber-400/30 transition-colors">
                <div className="w-10 h-10 rounded-lg bg-neutral-800 flex items-center justify-center mb-4">
                  <FiLayout className="w-5 h-5 text-amber-400" />
                </div>

                <h4 className="text-white font-semibold text-sm mb-2">
                  Tailwind CSS
                </h4>

                <p className="text-neutral-500 text-xs leading-relaxed">
                  Utilizado para construir el diseño visual, los componentes y
                  el sistema responsive de la aplicación.
                </p>
              </div>

              <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-5 hover:border-amber-400/30 transition-colors">
                <div className="w-10 h-10 rounded-lg bg-neutral-800 flex items-center justify-center mb-4">
                  <FiDatabase className="w-5 h-5 text-amber-400" />
                </div>

                <h4 className="text-white font-semibold text-sm mb-2">
                  Base de datos
                </h4>

                <p className="text-neutral-500 text-xs leading-relaxed">
                  Almacena usuarios, eventos y reservas, manteniendo la
                  información persistente y relacionada.
                </p>
              </div>

              <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-5 hover:border-amber-400/30 transition-colors">
                <div className="w-10 h-10 rounded-lg bg-neutral-800 flex items-center justify-center mb-4">
                  <FiLayers className="w-5 h-5 text-amber-400" />
                </div>

                <h4 className="text-white font-semibold text-sm mb-2">
                  Arquitectura Full Stack
                </h4>

                <p className="text-neutral-500 text-xs leading-relaxed">
                  Frontend, backend y persistencia de datos conectados para
                  formar una aplicación completa.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-neutral-800">
            <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-5">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="w-11 h-11 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center shrink-0">
                  <FiCheckCircle className="w-5 h-5 text-green-400" />
                </div>

                <div className="flex-1">
                  <p className="text-white text-sm font-semibold mb-1">
                    Proyecto desarrollado por Nicolás Bauzá
                  </p>

                  <p className="text-neutral-500 text-xs leading-relaxed">
                    Ticket Pass representa una experiencia práctica de
                    desarrollo full stack, combinando interfaz, APIs, seguridad,
                    persistencia de datos y lógica de negocio en una única
                    aplicación.
                  </p>
                </div>

                <span className="text-[10px] text-neutral-600 uppercase tracking-widest">
                  Full Stack
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
