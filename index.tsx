import { GoogleGenAI } from "@google/genai";
import { servicesData } from './servicesData'; // Importa los datos de servicios

// Informa a TypeScript sobre la variable global 'L' de Leaflet
declare var L: any;

// Large Data List for Services Directory
const fullServicesList = [
    "Acciones Integrales de Asistencia Social",
    "Adquisición de Complementos Nutricionales",
    "Adquisición de Insumos Ortopédicos",
    "Adquisición de medicamentos",
    "Adquisición Lentes Ópticos",
    "Actividades comunitarias en salud mental con profesores de establecimientos educacionales",
    "Actividades Solidarias",
    "Acompañamiento psicosocial",
    "Anexo Calle",
    "Aplicación de Ficha de Emergencia FIBE",
    "Apoyo a bomberos en caso de incendios en La Florida como en otras comunas (Región Metropolitana y otras regiones)",
    "Apoyo de habitabilidad",
    "Apoyo de pañales adulto",
    "Apoyo en Desvinculación Laboral",
    "Apoyo en llenado de \"Piscinas en tu barrio\" en periodo estival",
    "APOYO PSICOLÓGIC0 ATENCIÓN INDIVIDUAL",
    "Asesoramiento a Bienestar y Comités Internos",
    "Asesoría a condominios sociales y privados de la comuna",
    "Asesoría a Organizaciones Comunitarias sobre la Ley N°19.418 de Juntas de Vecinos y demás organizaciones",
    "Asesoría a personas jurídicas reguladas por el título XXXIII del Código Civil y Ley N° 20.500",
    "Asesoría en tramitación de Credencial de Discapacidad",
    "Asesoría general en subvenciones y fondos concursables",
    "Asesoría Jurídica a víctimas de delitos violentos",
    "Asesoría jurídica",
    "Asesoría y orientación en derechos indígenas",
    "ASESORÍA LEGAL ORIENTACIÓN MIGRATORIA ADULTOS Y NNA EN SITUACIÓN IRREGULAR",
    "Asistencia Social",
    "Atención a domicilio",
    "Atención de podología a pacientes con diabetes mellitus",
    "Atención de Público",
    "Atención fonoaudiológica",
    "Atención integral a personas en situación de vulnerabilidad social",
    "Atención integral a mujeres mayores de 15 años que sufren violencia intrafamiliar",
    "Atención Kinesiológica",
    "Atención podología a pacientes con diabetes mellitus. Curación de pie diabético",
    "Atención psicológica a víctimas de delitos violentos",
    "Atención Social Integral",
    "Atención terapia ocupacional",
    "Beca Escolar Municipal",
    "Becas PAE",
    "Becas PUE",
    "Becas TIC",
    "Beneficio a Jardín Infantil",
    "Buses de acercamiento",
    "Buses salidas pedagógicas",
    "Buses acciones comunales",
    "Capacitación Laboral OTEC",
    "Cenas de Fin de Año",
    "Centro de la Mujer",
    "Centro del Cariño (Programa Psicosocial)",
    "Consejería en salud sexual y reproductiva",
    "Consulta de morbilidad",
    "Consulta de salud mental",
    "Consulta de urgencia odontológica (incluye: Exodoncia, endodoncia primera fase)",
    "Consulta kinésica",
    "Consulta morbilidad ginecológica",
    "Consulta morbilidad obstétrica",
    "Consulta morbilidad odontológica (incluye: examen de salud odontológico, obturaciones, detartraje y pulido coronario)",
    "Consulta nutricional",
    "Consulta Odontológica preventiva (incluye: barniz de flúor, educación individual con instrucción de higiene, pulido coronario, sellantes)",
    "Consulta Odontológica preventiva (incluye: barniz de flúor, educación individual con instrucción de higiene, pulido coronario)",
    "Consulta Odontológica preventiva (incluye: educación individual con instrucción de higiene, pulido coronario)",
    "Consulta Odontológica preventiva gestante (incluye: barniz de flúor, educación individual con instrucción de higiene, pulido coronario)",
    "Consulta por déficit del desarrollo psicomotor",
    "Consulta tratamiento odontológico (incluye: obturaciones, detartraje)",
    "Consulta tratamiento odontológico (incluye: obturaciones, pulpotomías)",
    "Consulta tratamiento odontológico gestante (incluye: obturaciones, detartraje)",
    "Consulta urgencia odontológica (incluye: Exodoncia)",
    "Consulta y control de enfermedades crónicas, incluyendo aquellas efectuadas en las salas de control de enfermedades respiratorias del adulto de 20 años y más",
    "Consulta y control de enfermedades crónicas, incluyendo aquellas efectuadas en las salas de control de enfermedades respiratorias del adulto mayor de 65 años y más",
    "Consulta y/o consejería de salud mental",
    "Control crónico",
    "Control de Colonias de Gatos Ferales",
    "Control de enfermedades crónicas",
    "Control de lactancia materna",
    "Control de licencias de conducir (Renovación)",
    "Control de malnutrición",
    "Control de puerperio",
    "Control de regulación de fecundidad",
    "Control de salud",
    "Control de salud del niño sano",
    "Control ginecológico preventivo",
    "Control ginecológico preventivo, incluye control de climaterio en mujeres de 45 a 64 años",
    "Control preconcepcional",
    "Control prenatal",
    "Curación de pie diabético",
    "Derecho a Sala Cuna",
    "Desparasitación Externa",
    "Desparasitación Interna",
    "Difusión y Reubicación de Mascotas",
    "Duplas psicosociales",
    "Ecografía Obstétrica del Primer Trimestre",
    "Educación a grupos de riesgo",
    "Educación grupal",
    "Educación grupal odontológica",
    "Educación grupal odontológica en gestante",
    "Ejecución de Equipamiento para el Hogar",
    "Ejecución de Soluciones Constructivas",
    "El Área de Apoyo Psicosocial considera a todas aquellas personas que requieren atención y orientación en situaciones de interés familiar...",
    "El Servicio de Bienestar ofrece una amplia gama de beneficios para sus socios y sus cargas familiares...",
    "Equipo de Detección Temprana",
    "Equinoterapia",
    "Esterilización para Perros y Gatos (Licitación en curso)",
    "Entrega Alimentos",
    "Entrega de Apoyo y orientación a organizaciones Religiosas",
    "Entrega de Credenciales Versión Física de Cuidador",
    "Entrega de Libros a niños y niñas desde los 3 meses a los 12 años",
    "Entrega de Recursos de Habitabilidad",
    "Entrega de agua a campamentos sin suministro de escasos recursos",
    "Entrega de agua a familias en parcelas sin suministro",
    "Evaluación del desarrollo psicomotor",
    "Evaluación Socieconómica otorgamiento según Ordenanza Municipal",
    "Examen de salud odontológico",
    "Examen de salud odontológico en gestante",
    "Financiamiento en exámenes (convenio Clínica BUPA)",
    "Financiamiento en medicamentos",
    "Fiscalizaciones en terreno Ordenanzas Municipales",
    "FUNFAS ; Fundación para las Familias",
    "Gestión Territorial Asesorías y visitas a clubes de adulto mayor",
    "Gimnasia en terreno",
    "Implantación de Microchip de Identificación",
    "Implementación de Asesorías Familiares",
    "INGRESO INFORMACIÓN MIGRATORIA TRAMITACIÓN VISAS PARA NIÑOS, NIÑAS Y ADOLESCENTES",
    "INGRESO PRIMERA ACOGIDA ATENCIÓN MIGRATORIA ADULTOS",
    "Instalación de Estrategias Preventivas (HPP)",
    "Intervención del arbolado urbano",
    "Intervención Psicosocial",
    "Intervención psicosocial",
    "LABORATORIO (total población inscrita)",
    "La Florida Sobre Ruedas/ Calles Abiertas Familiares",
    "Mantención de áreas verdes concesionadas",
    "Municipio en tu Barrio",
    "NFC Geo-referencia Mascotas: Implementación de chips NFC para la identificación de mascotas",
    "Obtención de de Patentes Municipales (Comerciales-Industrial-Profesionales-Provisorias-Microempresa Familiar)",
    "Obtención de primera licencia de conducir",
    "Obtención Personalidad Jurídica",
    "Oficina de Intermediación Laboral OMIL",
    "Operativo Mal De Diógenes",
    "Operativos de cachureos",
    "Orientacion Jurídica (OPDAM)",
    "Orientacion social y derivaciones a redes de apoyo comunal (OPDAM)",
    "Orientación a organizaciones de la sociedad civil",
    "Orientación de los distintos programas de vivienda asociados a la politica habitacional del Ministerio de Vivienda y Urbanismo...",
    "Orientación para el pago de multas TAG",
    "Orientación presencial, telefónica y vía correo electrónico a vecinos que lo soliciten",
    "Orientación regularización de construcciones de Iglesias",
    "Orientación respecto a becas estatales",
    "Orientación y apoyo a organizaciones deportivas",
    "Orientación y apoyo en formulario de postulación Programa FOSIS",
    "Orientación y derivación en conflictos territoriales indígenas",
    "Orientación y derivación según las necesidades y requerimientos de las personas mayores, de manera intermunicipal",
    "Otorgamiento de permisos de comercio transitorio en BNUP dentro y fuera de la zona de exclusión",
    "Patrullajes preventivos de seguridad móvil, motorizado, infantería y aéreo",
    "Pensión Garantizada Universal",
    "Piscina Temperada",
    "Poda de árboles al interior de domicilios",
    "Postulación al Fondo Organización Regional de Acción Social (ORASMI)",
    "Prestamo de Libros",
    "Radiografías odontológicas",
    "Recintos Deportivos",
    "Reconstrucción Mamaria",
    "Recurso de cajas de mercaderia",
    "Retiro de Ramas",
    "Retiro de Voluminosos (Escombros y enseres)",
    "Riego de areas verdes en mantencion propia",
    "Sala de Musculación",
    "Salas de contencion emocional y habilitacion TEA",
    "SALUD DE ADOLESCENTES (población inscrita de 10 a 19 años)",
    "SALUD DE ADULTOS Y ADULTAS (población inscrita de 20 a 64 años)",
    "SALUD DE ADULTOS Y ADULTAS MAYORES (población inscrita de 65 a 80 y mas años)",
    "SALUD DE LA MUJER (población femenina de 10 a 80 y mas años)",
    "SALUD DE NIÑOS Y NIÑAS (población insccrita de 0 a 9 años)",
    "Sección Pintura",
    "Servicio de Aplicación de Jabón Potásico",
    "Servicio de cámaras de televigilancia",
    "Servicio de Lavado de Calles",
    "Servicio de Retiro de Panales de Avispas",
    "Servicio Funerario: Adquisición de Servicios Funerarios",
    "Servicio Funerario: Buses de acompañamiento",
    "Servicio Instalación, Reparación, Mantención de Lavado de Contenedores Comunitarios y Mantención de Papeleros en la Vía Pública",
    "Servicio Recolección de Residuos Sólidos Domiciliarios, Transporte y Disposición Intermedia Zona Norte",
    "Servicio Recolección de Residuos Sólidos Domiciliarios, Transporte y Disposición Intermedia Zona Sur",
    "Servicio Recolección, Limpieza de Residuos de Ferias Libres de la Comuna de La Florida",
    "Servicio/Operativo de Desinsectación",
    "Servicio/Operativo de Desratización",
    "Servicio/Operativo de Sanitización",
    "SUBE (Sistema Urbano de bicicletas y Estacionamientos): Sistema de aparcadero, custodia de bicicletas...",
    "Subsidio de Agua Potable",
    "Subsidio de Discapacidad",
    "Subsidio Familiar",
    "Subvención Municipal",
    "Suministro Exámenes Médicos",
    "Suministro de viviendas, materiales, kit y enseres de emergencia para familias damnificadas y/o afectadas por situaciones de emergencias",
    "Tarjeta Vecino VIVE LA FLORIDA: Tarjeta de beneficios y descuentos para vecinos de la comuna",
    "Teléfono de Emergencia 1416",
    "Terapias complementarias",
    "Terapias de Fonoaudiología, Terapia Ocupacional y Kinesiología",
    "Terapia Multisistémica",
    "Toma de exámenes (muestras)",
    "Trabajar con Calidad de Vida en la MYPE (Micro y Pequeñas Empresas)",
    "Traslado de Fauna Silvestre a Centros de Rehabilitación",
    "Traslado de muestras para Vigilancia Epidemiológica",
    "Uso de computadores gratuitos. Red Digital de Espacios Patrimoniales",
    "Vacunación",
    "Vacunación Antirrábica",
    "Vacunación Óctuple",
    "Vacunación Triple Felina",
    "Vinculación con Redes Sociales Internas y Externas al Municipio",
    "Visitas Inspectivas, en relación al Control de Plagas Urbanas, e Higiene Ambiental"
];

// Large Data List for Tramites Directory
const fullTramitesList = [
    "Acciones de promoción y sensibilización sobre los derechos de niños, niñas y adolescentes (NNA) en la comunidad",
    "Apoyo a dirigentes de organizaciones territoriales y funcionales",
    "Apoyo en postulación a becas y fondos indígenas",
    "Apoyo en procesos de transición de género",
    "App Portería Segurdad: Aplicación para la gestión de accesos en condominios y barrios",
    "Atención de Público General",
    "Atención de la demanda espontánea",
    "Atención oficina Multas TAG",
    "Atención y acompañamiento a niños, niñas y adolescentes (NNA) en situación de riesgo o vulneración de derechos",
    "CÁLCULO DE MULTA",
    "CERTIFICADO DE ADECUACIÓN DE ESTATUTOS / Emitir certificado de adecuación de estatutos",
    "Certificado de Areas Verdes",
    "Certificado de deuda de Derechos de Aseo",
    "Certificado de deuda de patente municipal",
    "CERTIFICADO DE DEPÓSITO / Emitir certificado de depósito que acredita la constitución de una nueva organización",
    "Certificado de Extracción",
    "CERTIFICADO DE VIGENCIA / Emitir certificado de vigencia provisorio a Juntas de Vecinos y demás organizaciones comunitarias",
    "Cobranza",
    "Convenios de pago",
    "Elaboración de informe social para la Credencial de Discapacidad",
    "Entrega de información sobre fondos comunitarios",
    "Espacio de articulación interinstitucional para la promoción, protección y fortalecimiento de derechos de NNA",
    "Espacio de coordinación y articulación entre instituciones para la protección de derechos de NNA",
    "Espacio de participación efectiva de niños, niñas y adolescentes (NNA) en la toma de decisiones",
    "Fiscalización de actividades economicas",
    "Fiscalización de publicidad",
    "Fondos Concursables Corporación Cultural de La Florida",
    "Gestión de pago de deuda de inmobiliarias",
    "INGRESO-AGENDAMIENTO DE CITAS",
    "Ingreso Registro Social de Hogares",
    "INFORME POR AYUDA SOCIAL",
    "Inscripción de Mascotas en Registro Nacional de Mascotas o Animales de Compañía",
    "INSCRIPCIÓN EN EL REGISTRO MUNICIPAL DE PERSONAS JURÍDICAS RECEPTORAS DE FONDOS PÚBLICOS",
    "Intervenciones",
    "Juntos somos más futuro QR: Plataforma digital con información de servicios municipales",
    "Notificaciones",
    "Oficina Sernac Comunal",
    "Operativos RSH Liceos Municipales y particulares subvencionados",
    "Portal La Florida: Plataforma web RRSS con información de servicios, actividades y noticias",
    "Postulación a fondos concursables",
    "Postulación a fondos externos",
    "Postulacion y desarrollo de proyecto DS 27 capitulo II y III",
    "Postulación Micro Radicación y DS49 Colectivo",
    "Postulación Subvención Regular",
    "Postulación subvenciones líneas Temáticas",
    "Recepción de documentación por la diferentes plataformas virtuales",
    "Recepción y despacho de Correspondencia Municipal",
    "Registro Social de Hogares Actualización de Cotizaciones de salud",
    "Registro Social de Hogares Actualización de Registros Administrativos Ingresos Monetarios",
    "Registro Social de Hogares Actualización de educación superior",
    "Registro Social de Hogares Actualización de ingresos de capital",
    "Registro Social de Hogares Actualización de ingresos monetarios por pensión y/o jubilación",
    "Registro Social de Hogares Actualización de matrícula en establecimiento educacional",
    "Registro Social de Hogares Actualización Módulo de vivienda",
    "Registro Social de Hogares Actualización Módulo Ocupación e Ingresos",
    "Registro Social de Hogares Actualizacion Modulo de Educación",
    "Registro Social de Hogares Actualización Módulo de Salud",
    "Registro Social de Hogares Actualización de propiedad de bien raíz",
    "Registro Social de Hogares Actualización de propiedad de vehículo terrestre y/o vehículo marítimo",
    "Registro Social de Hogares Cambio de Domicilio",
    "Registro Social de Hogares Cambio jefatura del hogar",
    "Registro Social de Hogares Complemento de bienes raíces para representantes de personas jurídicas sin fines de lucro",
    "Registro Social de Hogares Complemento de cotización de salud",
    "Registro Social de Hogares Complemento por cambio de rol: persona cuidadora principal/secundaria",
    "Registro Social de Hogares Complemento por Cese de Cuidados",
    "Registro Social de Hogares Complemento por cese de pensión de alimentos",
    "Registro Social de Hogares Complemento por cuidados",
    "Registro Social de Hogares Complemento por pago de arancel de establecimiento educacional",
    "Registro Social de Hogares Complemento por pago o recepción de compensación económica",
    "Registro Social de Hogares Complemento por pago o recepción de pensión de alimentos",
    "Registro Social de Hogares Complemento por propiedad en comunidad de bien raíz",
    "Registro Social de Hogares Complemento por variación de pensión de alimentos",
    "Registro Social de Hogares Desvinculación de integrantes",
    "Registro Social de Hogares Desvinculación Jefe de Hogar",
    "Registro Social de Hogares Incorporación de un nuevo integrante al hogar",
    "Registro Social de Hogares Ingreso y/o actualización para niños, niñas y adolescentes institucionalizados",
    "Registro Social de Hogares Rectificación de ingresos de capital",
    "Registro Social de Hogares Rectificación de ingresos monetarios como trabajador dependiente",
    "Registro Social de Hogares Rectificación de ingresos monetarios como trabajador independiente",
    "Registro Social de Hogares Rectificación de ingresos monetarios por pensión y/o jubilación",
    "Registro y acreditación indígena",
    "Solicitud de cambio de nombre cuando la propiedad cambia de dueño",
    "Solicitud de comodato y/o permiso de uso precario",
    "Vinculación"
];

// Large Data List for Programs Directory
const fullProgramasList = [
    "Administración de Complejo B",
    "Atención Prehospitalaria",
    "Bodega (Adquisición, recepción, almacenamiento, mantención, distribución y gestión de stocks de bienes municipales)",
    "Camas clínicas",
    "Clínica Ginecológica Móvil",
    "Clínica Odontológica Móvil",
    "Construcción y reparación de veredas",
    "Construcción y reparación de veredas,bajadas universales.",
    "Entrega de PACAM y Fármacos a Domicilio",
    "Instalación de hitos,escaños, vallas y actividades varias.",
    "Instalación de rejillas Batientes",
    "Mantención de Sumideros Aguas Lluvias y Pozos Absorbentes.",
    "Médico a Domicilio",
    "Médico en tu Barrio",
    "Mejoramiento de espacio público",
    "Motos de Rescate",
    "PASE (Programa Apoyo Seguridad Emprendedores): Asesoría en seguridad y prevención de delitos para emprendedores a través de servicio motorizado",
    "Plan de Educación Ambiental",
    "Programa 4 a 7 SERNAMEG",
    "Programa Apoyo a Organizaciones Deportivas y actividades comunitarias",
    "Programa Continuo Preventivo",
    "Programa Habilidades para la Vida",
    "Programa Junta tus Tapitas Plásticas",
    "Programa Me Vuelvo a Mover",
    "Programa Mujeres Jefas de Hogar",
    "Programa Nacional de Alimentación Complementaria",
    "Programa Parentalidad Positiva",
    "Programa Parentalidad para la prevención del consumo de alcohol y otras drogas",
    "Programa Puntos Verdes Vía Pública (Campanas - Canastos)",
    "Programa Reciclaje Condominios \"La Florida Recicla\"",
    "Programa Reciclaje de Aceite",
    "Programa Reciclaje de Baterías de Plomo",
    "Programa Reciclaje de Cápsulas de café Dolce Gusto",
    "Programa Reciclaje de Colilla de Cigarro",
    "Programa Reciclaje de Ecobotella",
    "Programa Reciclaje de Mezclilla",
    "Programa Reciclaje de Neumáticos",
    "Programa Reciclaje de Papel (Coar)",
    "Programa Reciclaje de Pilas, Residuos eléctricos y electrónicos",
    "Programa Reciclaje puerta a puerta \"La Florida Recicla\"",
    "Programa Red Local de Apoyos y Cuidados",
    "Programa Semillero Fútbol",
    "Programa Seguridad Especializada: otorgamiento de seguridad especializada para la comuna de La Florida",
    "Programa Turismo Familiar",
    "Programa Vacaciones Tercera Edad (VTE) - Modalidad clásico",
    "Programa Vacaciones Tercer Edad (VTE) Modalidad cupo social",
    "Programa Vacaciones Tercera Edad Escapadas - Cupos regulares",
    "Programa Vínculos convocatorias 2024 y 2025",
    "Programa de Desmalezado, Encargados de cortar Malezas y Pasto seco en la comuna",
    "Programa de Mantención de Limpieza de Paraderos del Transporte Público y Barrido de Veredas",
    "Programa de Pavimentos Participativos",
    "Programa de Prevención Comunitaria",
    "Programa de Recuperación de Espacios: Intervención de áreas urbanas en desuso",
    "Programa de alimentación complementaria del adulto mayor",
    "Programa de acompañamiento integral a niños, niñas y sus familias desde la gestación hasta los 9 años, con énfasis en la primera infancia",
    "Programa de acompañamiento integral deportivo de alto rendimiento (ADIAR)",
    "Programa de prevención en Establecimientos Educacionales PrePARA2",
    "Programa de viajes larga estadía en colaboración con oficina de turismo de otros municipios o directamente con el destino",
    "Programa de viajes por el día",
    "PROGRAMAS MUNICIPALES",
    "Programas de Entretenimento (18 en Tu Barrio, Parques Acuáticos, Colonias de Veranos, Programas de Natación, Invierno en tu Barrio)",
    "REVISIÓN SEMAFORO MUNICIPAL",
    "Reciklast FIT PLASTIC: Programa de reciclaje de plásticos y materiales reutilizables",
    "Reparación y mantención de recintos deportivos municipales",
    "Reparaciones y mejoramiento de calles y pasajes",
    "Retiro de letreros publicitarios propagandas comercial o electoral, Retiro de Kioscos, rejas, cierros...",
    "Sala de mamografía (Centro de Rescate 1416)",
    "Separando Los Residuos… Ganamos Todos",
    "Vacaciones Tercera Edad Programa Escapadas - Cupos sociales"
];

// Large Data List for Workshops and Talks Directory
const fullTalleresList = [
    "Actividades recreativas y de esparcimiento",
    "Actividades socioculturales (Festival La Florida es Teatro, Día de los Patrimonios, Día de la Poesía, Fiesta del Libro, Wiñol-Tripantu, Vacaciones de Invierno, Mes de la Niñez, Fiesta Criolla, Día de la Danza, Cierre de Año Talleres, Caravana Navideña, Festividades Navideñas)",
    "APOYO PSICOLÓGICO TALLER EN COLEGIO",
    "APOYO PSICOLÓGIC0 TALLER CÍRCULO DE MUJERES",
    "Apoyo en postulación a Fundación Villas Padre Hurtado",
    "Apoyo y derivación a la Fundación Alcanzable",
    "Asesoría Urbana",
    "Autorización de extracción de árboles en BNUP",
    "Bazar Florido: Espacios de comercialización para emprendedores locales",
    "Café Literario Bretton Woods: Espacio cultural con acceso a libros, actividades literarias y cafetería",
    "Capacitaciones",
    "Cartelera de Artes Escénicas del Teatro Municipal de La Florida",
    "Casa Emprender: Centro de apoyo integral para emprendedores",
    "CHARLA A ADULTOS SOBRE MIGRACIÓN",
    "Charla Buenas prácticas en atención de PcD",
    "Charla Credencial de Discapacidad y beneficios",
    "Charla Duelo y Discapacidad",
    "Charla Explicación Autismo a docentes",
    "Charla Ley de Autismo",
    "Charla Orientaciones para el manejo conductual y emocional en Autismo en el contexto escolar",
    "Charla Validación emocional y crianza positiva en la infancia",
    "Charla de habilidades parentales para el manejo conductual y emocional de hijos con autismo ON LINE",
    "Charla sobre Tenencia Responsable de Animales de Compañía",
    "Charlas informativas (OPDAM)",
    "Charlas sobre Control de Plagas de Importancia Sanitaria",
    "Charlas, capacitaciones y talleres formativos en temas de interés como derechos de la mujer, salud y bienestar",
    "Co-Work La Florida: Espacio de trabajo colaborativo para emprendedores y profesionales",
    "Competencia comunal baloncesto 3x3 CENCO Florida",
    "Competencia comunal de cueca escolar",
    "Competencia comunal tenis de mesa CENCO Florida",
    "Concurso inclusivo de cuentos",
    "Concurso inclusivo de dibujo",
    "Constitución comités de Allegados solicitados de manera espontánea desde los territorios",
    "Constitución de Organizaciones comunitarias, conforme a la Ley N° 19.418 de Juntas de Vecinos y demás organizaciones comunitarias. (Obtención de Personalidad Jurídica)",
    "Convenio de asistencia técnica Colegio de Arquitectos",
    "Desarrollo de talleres y actividades en el Centro Cultural de La Florida",
    "Desarrollo de talleres y actividades territoriales en sector Los Quillayes",
    "Elaborar Informe social y de redes",
    "Encuentro comunal de danza",
    "Encuentro inter escolar de patinaje artístico",
    "Escuela de Formación Abierta: Cursos y capacitaciones gratuitas para la comunidad",
    "Evento Sunset La Florida: Eventos culturales y recreativos al aire libre potenciando el desarrollo económico local con emprendedores, patio de comidas, feria de emprendimiento, servicios COFODEP y municipales",
    "Eventos Deportivos",
    "Feria Laboral La Florida: Espacio de encuentro entre empresas y personas en búsqueda de empleo",
    "Ferias Navideñas",
    "Ferias Temáticas y de Emprendimiento",
    "Ferias de emprendedoras",
    "Ferias de las Pulgas",
    "Ferias de servicios",
    "Food Trucks Urbanos: Espacios regulados para food trucks en la comuna, dieciséis food trucks de COFODEP",
    "Gestión para que estudiantes de educación superior realicen su práctica profesional en el municipio",
    "Implementación de Protocolos MINSAL",
    "Juegos Nacionales Deportivos Escolares",
    "La Florida Market: Espacio físico para la venta de productos de emprendedores locales",
    "La Florida Wine Fest: Feria de Vinos y Gastronomía",
    "La Pyme Floridana: Plataforma de visibilización y apoyo a emprendedores dando a conocer emprendimientos locales",
    "Laboratorio Textil: Espacio de capacitación en diseño y confección textil para emprendedores",
    "Olimpiadas deportivas COMUDEF",
    "Participación en talleres del Gobierno Regionales",
    "Participación social",
    "Permisos transitorios por festividad en BNUP fuera de exclusión",
    "Postulación a los Condominios de Viviendas Tuteladas CVT del Servicio Nacional del Adulto Mayor SENAMA",
    "Postulación a los Establecimientos de Larga Estadía ELEAM del Servicio Nacional del Adulto Mayor SENAMA",
    "Proceso de postulación a la Exención de Derechos de Aseo con y sin pago de contribuciones de manera presencial en los distintos procesos de postulación",
    "Proceso de postulación a la Exención de Derechos de Aseo con y sin pago de contribuciones de manera virtual en los distintos procesos de postulación",
    "Programación de postulaciones a domicilio para personas mayores y/o personas en situación de discapacidad, según solicitud de los vecinos y proceso de postulación vigente",
    "Programación de visitas a sectores de la comuna que necesiten orientación respecto del beneficio de Exención de Derechos de Aseo en los distintos procesos de postulación",
    "Promoción de la salud mental y bienestar en la comunidad educativa",
    "Promoción de temáticas asociadas a la inclusión y no discriminación",
    "Proyecto Notas de Amor",
    "Quiero Mi Barrio",
    "Red Digital de Espacios Patrimoniales",
    "Renovación de Comodato y/o permiso de uso precario",
    "Renovación de directiva de organización comunitaria, territorial y/o funcional, conforme a la Ley N° 19.418 de juntas de vecinos y demás organizaciones comunitarias",
    "Reuniones territoriales con los vecinos en materias de seguridad",
    "Revista La Florida Magazine: Publicación COFODEP con información de interés",
    "Solicitud de constitución de personas jurídicas sin fines de lucro: Corporaciones y Fundaciones",
    "TALLER DUELO MIGRATORIO",
    "Taller Baile entretenido",
    "Taller Conjunto instrumental avanzado",
    "Taller Convivamos Juntos",
    "Taller Convivencia y actividad de la vida diaria",
    "Taller Cuidadores de PcD",
    "Taller Cuidadores de personas con autismo (on line y presencial)",
    "Taller Cuidadores de personas con demencia y/o deterioro intelectual (on line y presencial)",
    "Taller Encuadernación I y II",
    "Taller Estimulación Cognitiva I y II",
    "Taller Exploración artística en dibujo y pintura",
    "Taller Exploración deportiva",
    "Taller Exploración sonora",
    "Taller Iniciación al arte musical",
    "Taller Manejo del dolor crónico",
    "Taller Manualidades I y II",
    "Taller Mecánico (mantención y reparación de vehículos menores y mayores, maquinaria pesada, y maquinaria menor)",
    "Taller Orientación y movilidad",
    "Taller Técnicas para el manejo del estrés y la ansiedad",
    "Taller de Cerrajeria (fabricación y reparación hitos, escaños, vallas, rejillas simples y batientes y actividades varias)",
    "Taller de alfabetización digital",
    "Talleres Deportivos",
    "Talleres de formación integral/EDEX",
    "Talleres, charlas y capacitaciones sobre derechos y cultura indígena",
    "Talleres formativos",
    "Terrazas Urbanas Emprendedores: Espacios para pequeños negocios en terrazas urbanas con equipamiento optimo",
    "Visitas Inspectivas, en relación a la Tenencia Responsable de Animales de Compañía",
    "Visitas en terreno y participar de las distintas actividades que realizan las congregaciones"
];

document.addEventListener('DOMContentLoaded', () => {

    const categoryTitles = {
        "pagos": "Portal de Pagos",
        "tramites": "Trámites Municipales",
        "comuna": "Vivir en la Florida",
        "personas": "Personas y Familia",
        "salud": "Salud y Educación",
        "cultura": "Cultura y Deporte",
        "desarrollo": "Desarrollo y Emprendimiento",
        "municipio": "Tu Municipalidad",
        "solicitud": "Solicitud de Servicios",
        "busqueda": "Resultados de Búsqueda",
        "directorio": "Servicios (A-Z)",
        "directorio-tramites": "Trámites (A-Z)",
        "directorio-programas": "Programas (A-Z)",
        "directorio-talleres": "Talleres y Charlas (A-Z)",
        "vecinos": "Vecinos"
    };
    
    // --- ACCESIBILIDAD (Code 1 Feature) ---
    let currentFontSize = 16;
    const fontDecreaseBtn = document.getElementById('font-decrease');
    const fontResetBtn = document.getElementById('font-reset');
    const fontIncreaseBtn = document.getElementById('font-increase');
    const contrastToggleBtn = document.getElementById('contrast-toggle');

    function updateFontSize(size) {
        document.documentElement.style.fontSize = size + 'px';
    }

    fontDecreaseBtn?.addEventListener('click', () => {
        if(currentFontSize > 12) {
            currentFontSize = currentFontSize - 1;
            updateFontSize(currentFontSize);
        }
    });

    fontResetBtn?.addEventListener('click', () => {
        currentFontSize = 16;
        updateFontSize(currentFontSize);
    });

    fontIncreaseBtn?.addEventListener('click', () => {
        if(currentFontSize < 24) {
            currentFontSize = currentFontSize + 1;
            updateFontSize(currentFontSize);
        }
    });

    contrastToggleBtn?.addEventListener('click', () => {
        document.body.classList.toggle('high-contrast');
    });

    // --- Lógica de Modo Nocturno (Mantenida y movida al toolbar) ---
    const themeToggle = document.getElementById('theme-toggle');
    const themeIconContainer = document.getElementById('theme-icon-container');
    const sunIcon = '<i class="fas fa-sun" aria-hidden="true"></i>';
    const moonIcon = '<i class="fas fa-moon" aria-hidden="true"></i>';

    const applyTheme = (theme) => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
            if(themeIconContainer) themeIconContainer.innerHTML = sunIcon;
        } else {
            document.documentElement.classList.remove('dark');
            if(themeIconContainer) themeIconContainer.innerHTML = moonIcon;
        }
    };

    themeToggle?.addEventListener('click', () => {
        const isDark = document.documentElement.classList.contains('dark');
        const newTheme = isDark ? 'light' : 'dark';
        localStorage.setItem('theme', newTheme);
        applyTheme(newTheme);
    });
    
    // Aplicar tema al cargar la página
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (savedTheme) {
        applyTheme(savedTheme);
    } else if (prefersDark) {
        applyTheme('dark');
    } else {
        applyTheme('light');
    }

    // --- AI Configuration ---
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

    // --- LOGIN MODAL LOGIC (Code 1 Feature) ---
    const loginTrigger = document.getElementById('login-trigger');
    const loginModal = document.getElementById('login-modal');
    const loginClose = document.getElementById('login-close');
    const loginForm = document.getElementById('login-form');
    const claveUnicaLoginBtn = document.getElementById('claveunica-login-btn');

    function toggleLoginModal(show) {
        if(show) {
            loginModal?.classList.remove('hidden');
            loginModal?.classList.add('flex');
        } else {
            loginModal?.classList.add('hidden');
            loginModal?.classList.remove('flex');
        }
    }

    loginTrigger?.addEventListener('click', () => toggleLoginModal(true));
    loginClose?.addEventListener('click', () => toggleLoginModal(false));
    loginModal?.addEventListener('click', (e) => { if (e.target === loginModal) toggleLoginModal(false); });
    
    loginForm?.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Simulación: Inicio de sesión exitoso. Bienvenido Vecino.');
        toggleLoginModal(false);
        toggleVecinosModal(true);
    });

    claveUnicaLoginBtn?.addEventListener('click', () => {
        alert('Simulación: Redirigiendo a ClaveÚnica... Inicio de sesión exitoso.');
        toggleLoginModal(false);
        toggleVecinosModal(true);
    });

    // --- REDACTOR MÁGICO IA (Code 1 Feature) ---
    const aiWriterModal = document.getElementById('ai-writer-modal');
    const aiWriterClose = document.getElementById('ai-writer-close');
    const aiGenerateBtn = document.getElementById('ai-generate-btn');
    const writerTypeInput = document.getElementById('writer-type') as HTMLInputElement;
    const writerDetailsInput = document.getElementById('writer-details') as HTMLTextAreaElement;
    const writerOutput = document.getElementById('writer-output') as HTMLTextAreaElement;
    const writerResult = document.getElementById('writer-result');

    // Función global para abrir el redactor (usada en renderServiceCard)
    (window as any).openAIWriter = (serviceName) => {
        writerTypeInput.value = serviceName;
        writerDetailsInput.value = '';
        writerOutput.value = '';
        writerResult?.classList.add('hidden');
        aiWriterModal?.classList.remove('hidden');
        aiWriterModal?.classList.add('flex');
    };

    aiWriterClose?.addEventListener('click', () => {
        aiWriterModal?.classList.add('hidden');
        aiWriterModal?.classList.remove('flex');
    });

    aiGenerateBtn?.addEventListener('click', async () => {
        const type = writerTypeInput.value;
        const details = writerDetailsInput.value;
        
        if(!details.trim()) { alert('Por favor, agrega algunos detalles.'); return; }

        const originalText = aiGenerateBtn.innerHTML;
        aiGenerateBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Redactando...';
        (aiGenerateBtn as HTMLButtonElement).disabled = true;

        try {
            const prompt = `Actúa como un experto administrativo municipal. Redacta una carta formal dirigida a la Municipalidad de La Florida para el trámite: "${type}".
            Detalles proporcionados por el vecino: "${details}".
            La carta debe ser respetuosa, clara y concisa. Incluye marcadores de posición para [Nombre], [RUT] y [Fecha] si es necesario.`;

            const response = await ai.models.generateContent({
                model: "gemini-2.5-flash",
                contents: prompt,
            });

            writerOutput.value = response.text;
            writerResult?.classList.remove('hidden');
        } catch (error) {
            console.error(error);
            alert('Error al generar la carta. Intenta de nuevo.');
        } finally {
            aiGenerateBtn.innerHTML = originalText;
            (aiGenerateBtn as HTMLButtonElement).disabled = false;
        }
    });

    // --- Lógica para el Modal de Búsqueda y Sugerencias (Code 2 Feature) ---
    const searchForm = document.getElementById('search-form');
    const searchInput = document.getElementById('search-input') as HTMLInputElement;
    const searchModal = document.getElementById('search-modal');
    const searchResults = document.getElementById('search-results');
    const searchModalCloseButton = document.getElementById('search-modal-close-button');
    const suggestionChips = document.querySelectorAll('.suggestion-chip');

    // Manejar clics en chips de sugerencia
    suggestionChips.forEach(chip => {
        chip.addEventListener('click', () => {
            const term = (chip as HTMLElement).dataset.search;
            if(term) {
                searchInput.value = term;
                searchInput.focus();
                // Opcional: Auto-submit
                performSearch(term);
            }
        });
    });

    async function performSearch(query) {
        if (!query.trim()) return;
        
        if (searchResults) {
            searchResults.innerHTML = `
                <div class="flex justify-center items-center py-8">
                    <svg class="animate-spin -ml-1 mr-3 h-8 w-8 text-[var(--color-primary)]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span class="text-lg font-medium text-black">Buscando información...</span>
                </div>
            `;
            
            searchModal?.classList.remove('hidden');
            searchModal?.classList.add('flex');

            try {
                const prompt = `Eres un asistente virtual para el portal de la Municipalidad de La Florida, Chile. Tu objetivo es responder las preguntas de los ciudadanos de la manera más clara, concisa y útil posible, utilizando información actualizada de la web. Pregunta del ciudadano: "${query}"`;

                const response = await ai.models.generateContent({
                    model: "gemini-2.5-flash",
                    contents: prompt,
                    config: {
                        tools: [{ googleSearch: {} }],
                    },
                });

                const text = response.text;
                // Removed logic for displaying sources

                let htmlContent = '';
                const lines = text.split('\n').filter(line => line.trim() !== '');
                
                htmlContent += '<div class="space-y-3 leading-relaxed text-black">'; // Force black text
                for (const line of lines) {
                    let processedLine = line.trim()
                        .replace(/\*\*(.*?)\*\*/g, '<strong class="text-black font-bold">$1</strong>') // Black for strong
                        .replace(/\*(.*?)\*/g, '<em>$1</em>');

                    if (processedLine.startsWith('• ') || processedLine.startsWith('- ') || processedLine.startsWith('* ')) {
                         htmlContent += `<div class="flex items-start gap-2 ml-2"><span class="text-[var(--color-primary)] mt-1.5">•</span><span>${processedLine.substring(2)}</span></div>`;
                    } else if (processedLine.startsWith('# ')) {
                        htmlContent += `<h4 class="font-bold text-lg mt-4 text-[var(--color-primary)]">${processedLine.substring(2)}</h4>`;
                    } else {
                        htmlContent += `<p>${processedLine}</p>`;
                    }
                }
                htmlContent += '</div>';

                searchResults.innerHTML = `
                    <div class="text-left text-base">${htmlContent}</div>
                `;

            } catch (error) {
                console.error("Error en la búsqueda con IA:", error);
                searchResults.innerHTML = '<p class="text-red-600 font-medium">Ocurrió un error al realizar la búsqueda con IA. Por favor, inténtalo de nuevo más tarde.</p>';
            }
        }
    }

    searchForm?.addEventListener('submit', (e) => {
        e.preventDefault();
        performSearch(searchInput.value.trim());
    });

    function closeModal() {
        searchModal?.classList.add('hidden');
        searchModal?.classList.remove('flex');
    }
    
    searchModal?.addEventListener('click', (e) => { if (e.target === searchModal) closeModal(); });
    searchModalCloseButton?.addEventListener('click', closeModal);
    window.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });
    
    // --- CHATBOT LOGIC ---
    const chatbotTrigger = document.getElementById('chatbot-trigger');
    const chatbotWindow = document.getElementById('chatbot-window');
    const chatbotClose = document.getElementById('chatbot-close');
    const chatbotMessages = document.getElementById('chatbot-messages');
    const chatbotInput = document.getElementById('chatbot-text-input') as HTMLInputElement;
    const chatbotSend = document.getElementById('chatbot-send');

    let chatHistory = [];

    // Initial toggle logic
    chatbotTrigger?.addEventListener('click', () => {
        chatbotWindow?.classList.remove('hidden-chat');
        chatbotTrigger.classList.add('hidden');
        chatbotInput?.focus();
    });

    chatbotClose?.addEventListener('click', () => {
        chatbotWindow?.classList.add('hidden-chat');
        chatbotTrigger?.classList.remove('hidden');
    });

    async function handleChatSubmit() {
        const userMessage = chatbotInput.value.trim();
        if (!userMessage) return;

        addMessageToChat(userMessage, 'user');
        chatbotInput.value = '';
        
        const typingIndicatorId = addTypingIndicator();

        try {
            const prompt = `
            Historial de conversación:
            ${chatHistory.map(msg => `${msg.role === 'user' ? 'Usuario' : 'Asistente'}: ${msg.text}`).join('\n')}
            
            Usuario: ${userMessage}
            
            Instrucciones: Eres un asistente virtual inteligente de la Municipalidad de La Florida. Responde de manera amable, útil y concisa.
            `;

            const response = await ai.models.generateContent({
                model: "gemini-3-pro-preview", // Usando modelo avanzado para chat
                contents: prompt,
                config: {
                    thinkingConfig: { thinkingBudget: 32768 },
                },
            });

            removeTypingIndicator(typingIndicatorId);

            const reply = response.text;
            addMessageToChat(reply, 'bot');

            chatHistory.push({ role: 'user', text: userMessage });
            chatHistory.push({ role: 'model', text: reply });

        } catch (error) {
            console.error("Error chatbot:", error);
            removeTypingIndicator(typingIndicatorId);
            addMessageToChat("Lo siento, tuve un problema al procesar tu solicitud. Inténtalo de nuevo.", 'bot');
        }
    }

    function addMessageToChat(text, sender) {
        const msgDiv = document.createElement('div');
        const isUser = sender === 'user';
        
        // Improved contrast for chat bubbles
        msgDiv.className = `chat-message ${sender} ${isUser 
            ? 'bg-[var(--color-primary)] text-white self-end rounded-br-none' 
            : 'bg-white text-black self-start rounded-bl-none border border-gray-300'} p-3 rounded-2xl shadow-sm text-sm max-w-[85%]`;
        
        // Format simple markdown
        let formattedText = text
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/\n/g, '<br>');

        msgDiv.innerHTML = formattedText;
        chatbotMessages?.appendChild(msgDiv);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }

    function addTypingIndicator() {
        const id = 'typing-' + Date.now();
        const div = document.createElement('div');
        div.id = id;
        div.className = 'bg-white border border-gray-300 p-3 rounded-2xl rounded-bl-none shadow-sm w-16 self-start';
        div.innerHTML = '<div class="flex space-x-1 justify-center"><div class="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div><div class="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style="animation-delay: 0.2s"></div><div class="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style="animation-delay: 0.4s"></div></div>';
        chatbotMessages?.appendChild(div);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
        return id;
    }

    function removeTypingIndicator(id) {
        const element = document.getElementById(id);
        if (element) element.remove();
    }

    chatbotSend?.addEventListener('click', handleChatSubmit);
    chatbotInput?.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleChatSubmit();
    });

    // --- LOGICA DE TIPOS DE SERVICIO (Code 1 Feature) ---
    const typeButtons = document.querySelectorAll('.service-type-btn');
    
    typeButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            // Remove active class from all buttons
            typeButtons.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            const target = (e.currentTarget as HTMLElement);
            target.classList.add('active');
            
            const type = target.dataset.type;
            
            // Si el tipo es 'servicio', mostramos el directorio A-Z
            if (type === 'servicio') {
                showPage('directorio');
            } else if (type === 'tramite') {
                showPage('directorio-tramites');
            } else if (type === 'programa') {
                showPage('directorio-programas');
            } else if (type === 'taller') {
                showPage('directorio-talleres');
            } else if (type) {
                // Para otros tipos, usamos el filtro normal
                filterByServiceType(type);
            }
        });
    });

    function filterByServiceType(type) {
        // Consolidate all services
        let allServices = [];
        Object.keys(servicesData).forEach(key => {
            allServices = allServices.concat(servicesData[key].map(s => ({...s, originalCategory: key})));
        });

        // Filter by type (case insensitive, partial match)
        const filtered = allServices.filter(s => s.tipo && s.tipo.toLowerCase().includes(type.toLowerCase()));
        
        renderServiceTypeResults(filtered, type);
        
        // Update UI state
        mainDashboard?.classList.add('hidden');
        if (mainDashboard) mainDashboard.style.display = 'none';
        pageContentWrapper?.classList.remove('hidden');
        document.title = `Resultados: ${type.charAt(0).toUpperCase() + type.slice(1)} - Portal Municipal`;
        window.scrollTo(0, 0);
        
        // Update active sidebar state (deselect all)
        sidebarItems.forEach(item => item.classList.remove('active-tab'));
    }

    function renderServiceTypeResults(services, typeName) {
         if (!pageContentWrapper) return;

        const title = typeName.charAt(0).toUpperCase() + typeName.slice(1) + (typeName.endsWith('s') ? '' : 's');

        const pageHTML = `
            <section id="search-results-page" class="page-section">
                <div class="mb-6 flex items-center gap-4">
                    <button onclick="window.showPage('home')" class="text-[var(--color-primary)] hover:underline font-bold flex items-center gap-1">
                        <i class="fas fa-arrow-left"></i> Volver
                    </button>
                    <h2 class="text-3xl font-extrabold text-[var(--color-primary)] border-b-4 border-[var(--lf-yellow)] inline-block pb-1">${title}</h2>
                </div>
                
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    ${services.length > 0 
                        ? services.map(service => renderServiceCard(service, service.originalCategory)).join('') 
                        : `<p class="col-span-3 text-center text-lg text-gray-600 dark:text-white py-12">No se encontraron resultados para "${typeName}".</p>`
                    }
                </div>
                <div id="search-service-detail" class="hidden"></div>
            </section>
        `;
        pageContentWrapper.innerHTML = pageHTML;

        // Re-attach click listeners for cards in search results
        document.querySelectorAll(`#search-results-page .service-page-card`).forEach(card => {
            card.addEventListener('click', (e) => {
                const serviceTitle = (card as HTMLElement).dataset.serviceTitle;
                const category = (card as HTMLElement).dataset.category;
                if (serviceTitle && category) {
                    // Render detail in the search context div
                    const detailContainer = document.getElementById('search-service-detail');
                    const listContainer = card.parentElement; // The grid
                    
                    if (detailContainer && listContainer) {
                        // Render the detail into the hidden div
                        const service = servicesData[category].find(s => s.title === serviceTitle);
                        if(service) {
                            const payButton = service.tipo === 'Pago' 
                                ? `<button class="w-full mt-4 bg-[var(--lf-green)] text-white text-lg font-bold py-3 px-6 rounded-xl hover:bg-green-600 transition flex items-center justify-center gap-3 transform hover:-translate-y-1 shadow-lg">
                                    <i class="fas fa-money-bill-wave fa-lg"></i> IR A PAGAR AHORA
                                </button>`
                                : '';
                                
                             const detailHTML = `
                                <button id="search-back-btn" class="mb-6 text-[var(--color-primary)] font-bold flex items-center gap-2 hover:underline text-lg">
                                    <i class="fas fa-arrow-left" aria-hidden="true"></i> Volver a Resultados
                                </button>
                                <article class="bg-[var(--bg-secondary)] p-8 rounded-2xl shadow-lg service-detail-view border border-gray-200 dark:border-gray-700">
                                    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                                        <div class="md:col-span-2">
                                            <span class="inline-block bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100 text-xs font-bold px-3 py-1 rounded-full uppercase mb-2">${service.tipo || 'Servicio'}</span>
                                            <h2 class="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white">“${service.tagline}”</h2>
                                            
                                            <div class="prose max-w-none text-gray-900 dark:text-white text-lg leading-relaxed font-medium">
                                                <h3 class="text-xl font-bold text-[var(--color-primary)] mt-6 mb-2">¿Qué necesidad responde?</h3>
                                                <p class="font-medium text-gray-900 dark:text-white">${service.details.necesidad || 'No especificado.'}</p>

                                                <h3 class="text-xl font-bold text-[var(--color-primary)] mt-6 mb-2">¿En qué consiste?</h3>
                                                <p class="font-medium text-gray-900 dark:text-white">${service.details.consiste}</p>
                                                
                                                <h3 class="text-xl font-bold text-[var(--color-primary)] mt-6 mb-2">¿Cómo acceder?</h3>
                                                <p class="font-medium text-gray-900 dark:text-white">${service.details.como}</p>

                                                <h3 class="text-xl font-bold text-[var(--color-primary)] mt-6 mb-2">Horario / Frecuencia</h3>
                                                <p class="flex items-center gap-2 font-bold text-gray-900 dark:text-white"><i class="far fa-clock"></i> ${service.details.horario || 'No especificado'}</p>
                                            </div>
                                        </div>
                                        <aside>
                                            <div class="bg-[var(--bg-tertiary)] p-6 rounded-xl border border-gray-300 dark:border-gray-600">
                                                <h4 class="font-bold text-lg mb-4 text-gray-900 dark:text-white">Resumen</h4>
                                                <ul class="space-y-3 text-sm text-gray-900 dark:text-white font-bold">
                                                    <li class="flex items-start gap-2"><i class="fas fa-users mt-1 text-[var(--color-primary)]"></i> <span><strong>Público:</strong><br> ${service.publico ? service.publico.join(', ') : 'General'}</span></li>
                                                    <li class="flex items-start gap-2"><i class="fas fa-tag mt-1 text-[var(--color-primary)]"></i> <span><strong>Tipo:</strong><br> ${service.tipo || 'No especificado'}</span></li>
                                                    <li class="flex items-start gap-2"><i class="fas fa-laptop-house mt-1 text-[var(--color-primary)]"></i> <span><strong>Modalidad:</strong><br> ${service.modalidad ? service.modalidad.join(', ') : 'No especificada'}</span></li>
                                                </ul>
                                            </div>
                                            ${payButton}
                                        </aside>
                                    </div>
                                </article>
                            `;
                            
                            detailContainer.innerHTML = detailHTML;
                            listContainer.classList.add('hidden');
                            detailContainer.classList.remove('hidden');
                            
                            document.getElementById('search-back-btn')?.addEventListener('click', () => {
                                detailContainer.classList.add('hidden');
                                listContainer.classList.remove('hidden');
                            });
                        }
                    }
                }
            });
        });
    }

    // --- LÓGICA DEL MAPA INTERACTIVO ---
    let map: any;
    let mapInitialized = false;
    let cesfamLayer: any;
    let reciclajeLayer: any;

    const mapPoints = [
        { lat: -33.5225, lng: -70.5939, type: 'cesfam', name: 'CESFAM DR. FERNANDO MAFFIOLETTI', address: 'Avenida Central N°301', hours: 'L-J: 08:30-17:30' },
        { lat: -33.5653, lng: -70.5815, type: 'cesfam', name: 'CESFAM JOSÉ ALVO', address: 'Bacteriológico N°10.817', hours: 'L-J: 08:30-17:30' },
        { lat: -33.5208, lng: -70.5794, type: 'cesfam', name: 'CESFAM LA FLORIDA', address: 'Avenida La Florida N°6.015', hours: 'L-J: 08:30-17:30' },
        { lat: -33.5186, lng: -70.5841, type: 'cesfam', name: 'CESFAM LOS CASTAÑOS', address: 'Diagonal Los Castaños N°5.820', hours: '24 horas' },
        { lat: -33.5679, lng: -70.5702, type: 'cesfam', name: 'CESFAM LOS QUILLAYES', address: 'Julio César N°10.905', hours: '24 horas' },
        { lat: -33.5358, lng: -70.5960, type: 'cesfam', name: 'CESFAM SANTA AMALIA', address: 'Santa Amalia N°202', hours: 'L-J: 08:30-17:30' },
        { lat: -33.5358, lng: -70.5898, type: 'cesfam', name: 'CESFAM TRINIDAD', address: 'Avenida Uno N°10.021', hours: 'L-J: 08:30-17:30' },
        { lat: -33.5135, lng: -70.6074, type: 'cesfam', name: 'CESFAM VILLA O\'HIGGINS', address: 'Santa Julia N°870', hours: '24 horas' },
        { lat: -33.5332, lng: -70.5721, type: 'cesfam', name: 'CESFAM BELLAVISTA', address: 'Pudeto N°7.100', hours: 'L-J: 08:30-17:30' },
        // Recycling
        { lat: -33.5133, lng: -70.6111, type: 'reciclaje', name: 'Punto limpio WOM Mall Plaza Vespucio', address: 'Av. Vicuña Mackenna 7110', hours: 'L-V: 10:00 - 21:30' },
        { lat: -33.4975, lng: -70.6033, type: 'reciclaje', name: 'Punto limpio Sodimac Nueva La Florida', address: 'Av. José Pedro Alessandri 6402', hours: 'L-S: 10:00 - 17:00' },
        { lat: -33.5412, lng: -70.5630, type: 'reciclaje', name: 'Punto limpio Club de Leones La Florida Sur', address: 'Calle Don Pepe 250', hours: 'L-S: 10:00 - 18:30' },
        { lat: -33.5103, lng: -70.5694, type: 'reciclaje', name: 'Punto limpio Club Vive La Florida', address: 'El Ulmo 824', hours: 'L-S: 10:00 - 20:00' },
    ];

    function initializeMap() {
        if (mapInitialized || !document.getElementById('map-container')) return;

        map = L.map('map-container').setView([-33.538, -70.585], 13);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; OpenStreetMap contributors'
        }).addTo(map);

        const cesfamIcon = L.divIcon({
            html: `<div class="w-10 h-10 bg-red-600 rounded-full border-4 border-white shadow-lg flex items-center justify-center text-white text-lg transform hover:scale-110 transition-transform">
                    <i class="fas fa-clinic-medical"></i>
                   </div>`,
            className: 'bg-transparent',
            iconSize: [40, 40],
            iconAnchor: [20, 20],
            popupAnchor: [0, -20]
        });

        const reciclajeIcon = L.divIcon({
            html: `<div class="w-10 h-10 bg-green-600 rounded-full border-4 border-white shadow-lg flex items-center justify-center text-white text-lg transform hover:scale-110 transition-transform">
                    <i class="fas fa-recycle"></i>
                   </div>`,
            className: 'bg-transparent',
            iconSize: [40, 40],
            iconAnchor: [20, 20],
            popupAnchor: [0, -20]
        });

        cesfamLayer = L.layerGroup();
        reciclajeLayer = L.layerGroup();

        mapPoints.forEach(point => {
            const marker = L.marker([point.lat, point.lng], { 
                icon: point.type === 'cesfam' ? cesfamIcon : reciclajeIcon 
            }).bindPopup(`<b>${point.name}</b><br>${point.address}<br><i>${point.hours}</i>`);

            if (point.type === 'cesfam') {
                marker.addTo(cesfamLayer);
            } else {
                marker.addTo(reciclajeLayer);
            }
        });

        cesfamLayer.addTo(map);
        reciclajeLayer.addTo(map);
        
        document.getElementById('cesfam-toggle')?.addEventListener('change', (e) => {
            const target = e.target as HTMLInputElement;
            if (target.checked) map.addLayer(cesfamLayer);
            else map.removeLayer(cesfamLayer);
        });
        
        document.getElementById('reciclaje-toggle')?.addEventListener('change', (e) => {
            const target = e.target as HTMLInputElement;
            if (target.checked) map.addLayer(reciclajeLayer);
            else map.removeLayer(reciclajeLayer);
        });

        mapInitialized = true;
        setTimeout(() => map.invalidateSize(), 100);
    }


    // --- NAVEGACIÓN Y RENDERIZADO ---
    const navLinks = document.querySelectorAll('.nav-link');
    const mainDashboard = document.getElementById('main-dashboard');
    const pageContentWrapper = document.getElementById('page-content-wrapper');
    const sidebarItems = document.querySelectorAll('.sidebar-item');

    function showPage(pageId) {
        const defaultTitle = "Portal Municipal - La Florida";
        
        // Hide all page sections
        document.querySelectorAll('.page-section').forEach(section => {
            section.classList.add('hidden');
            if (section instanceof HTMLElement) section.style.display = 'none';
        });
        
        sidebarItems.forEach(item => {
            item.classList.remove('active-tab');
        });
        
        const activeItem = document.querySelector(`.sidebar-item[data-page="${pageId}"]`);
        if (activeItem) {
            activeItem.classList.add('active-tab');
        }

        if (pageId === 'home') {
            mainDashboard?.classList.remove('hidden');
            if (mainDashboard) mainDashboard.style.display = 'flex';
            pageContentWrapper?.classList.add('hidden');
            if (pageContentWrapper) pageContentWrapper.innerHTML = '';
            document.title = defaultTitle;
            initializeMap();
            
            // Reset secondary nav active state when going home
            document.querySelectorAll('.service-type-btn').forEach(btn => btn.classList.remove('active'));
            
        } else if (pageId === 'solicitud') {
            pageContentWrapper?.classList.remove('hidden');
            document.title = `${categoryTitles[pageId]} - ${defaultTitle}`;
            renderSolicitudPage();
            
            // Reset secondary nav active state
             document.querySelectorAll('.service-type-btn').forEach(btn => btn.classList.remove('active'));

        } else if (pageId === 'vecinos') {
            toggleVecinosModal(true);
            
            // Reset secondary nav active state
            document.querySelectorAll('.service-type-btn').forEach(btn => btn.classList.remove('active'));

        } else if (pageId === 'directorio') {
            pageContentWrapper?.classList.remove('hidden');
            document.title = `${categoryTitles[pageId]} - ${defaultTitle}`;
            renderDirectoryPage(fullServicesList, "Servicios (A-Z)", "Directorio completo de servicios municipales de la A a la Z.");

        } else if (pageId === 'directorio-tramites') {
            pageContentWrapper?.classList.remove('hidden');
            document.title = `${categoryTitles[pageId]} - ${defaultTitle}`;
            renderDirectoryPage(fullTramitesList, "Trámites (A-Z)", "Lista completa de trámites municipales ordenados alfabéticamente.");
            
        } else if (pageId === 'directorio-programas') {
            pageContentWrapper?.classList.remove('hidden');
            document.title = `${categoryTitles[pageId]} - ${defaultTitle}`;
            renderDirectoryPage(fullProgramasList, "Programas (A-Z)", "Lista completa de programas municipales ordenados alfabéticamente.");
            
        } else if (pageId === 'directorio-talleres') {
            pageContentWrapper?.classList.remove('hidden');
            document.title = `${categoryTitles[pageId]} - ${defaultTitle}`;
            renderDirectoryPage(fullTalleresList, "Talleres y Charlas (A-Z)", "Lista completa de talleres, charlas y actividades comunitarias.");
            
        } else {
            pageContentWrapper?.classList.remove('hidden');
            document.title = `${categoryTitles[pageId] || 'Servicios'} - ${defaultTitle}`;
            renderServicePage(pageId);
            
            // Reset secondary nav active state
            document.querySelectorAll('.service-type-btn').forEach(btn => btn.classList.remove('active'));
        }
        window.scrollTo(0, 0);
    }
    
    // Expose showPage to window
    (window as any).showPage = showPage;

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = (e.target as HTMLElement).closest('.nav-link') as HTMLElement;
            const pageId = target.dataset.page;
            if (pageId) {
                showPage(pageId);
            }
        });
    });

    // --- VECINO DIGITAL STATE ---
    let familyMembers = [
        { id: 1, name: 'Juan Pérez', relationship: 'Jefe de Hogar', rut: '12.345.678-9', status: 'Validado' },
        { id: 2, name: 'María González', relationship: 'Cónyuge', rut: '15.678.901-2', status: 'Validado' }
    ];

    let pets = [
        { id: 1, name: 'Firulais', species: 'Perro', breed: 'Quiltro', status: 'Vacunas al día', chip: '987654321', age: '5 años', weight: '15kg', lastVax: '12/01/2024' },
        { id: 2, name: 'Mimi', species: 'Gato', breed: 'Siamés', status: 'Vacuna pendiente', chip: 'N/A', age: '2 años', weight: '4kg', lastVax: '05/11/2023' }
    ];

    let tramites = [
        { id: 1, date: '15/05/2024', title: 'Permiso de Circulación', status: 'Completado', detail: 'Permiso de Circulación 2024 - Aprobado y Pagado. Folio: #99821. Vehículo: AB-CD-12.' },
        { id: 2, date: '10/05/2024', title: 'Solicitud de Poda', status: 'En Proceso', detail: 'Solicitud de Poda - En inspección técnica. Se programó visita para el 20/05/2024.' }
    ];

    function renderVecinosPage() {
        const menuGrid = document.getElementById('vecinos-menu-grid');
        const detailContainer = document.getElementById('vecinos-detail-container');
        if (!menuGrid || !detailContainer) return;

        const menuItems = [
            { id: 'registro-familiar', title: 'Registro Familiar', icon: 'users', description: 'Inscribe y gestiona los integrantes de tu hogar.' },
            { id: 'mascotas', title: 'Mascotas', icon: 'dog', description: 'Registra tus mascotas y accede a servicios veterinarios.' },
            { id: 'tramites-realizados', title: 'Trámites Realizados', icon: 'clipboard-list', description: 'Consulta el historial de tus solicitudes y trámites.' },
            { id: 'descarga-documentos', title: 'Descarga de Documentos', icon: 'download', description: 'Obtén certificados y documentos municipales.' },
            { id: 'cambio-clave', title: 'Cambio de Clave', icon: 'key', description: 'Actualiza tu contraseña de acceso al portal.' }
        ];

        menuGrid.innerHTML = menuItems.map(item => `
            <div class="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-md transition-all cursor-pointer group" onclick="renderVecinosSubPage('${item.id}')">
                <div class="w-12 h-12 bg-indigo-50 dark:bg-indigo-900/30 rounded-xl flex items-center justify-center mb-4 group-hover:bg-indigo-100 dark:group-hover:bg-indigo-900/50 transition-colors">
                    <i class="fas fa-${item.icon} text-indigo-600 dark:text-indigo-400 text-xl"></i>
                </div>
                <h3 class="text-xl font-bold text-slate-900 dark:text-white mb-2">${item.title}</h3>
                <p class="text-slate-600 dark:text-slate-400 text-sm">${item.description}</p>
            </div>
        `).join('');

        // Ensure grid is visible and detail is hidden initially
        menuGrid.classList.remove('hidden');
        detailContainer.classList.add('hidden');
    }

    function renderVecinosSubPage(subPageId) {
        const menuGrid = document.getElementById('vecinos-menu-grid');
        const detailContainer = document.getElementById('vecinos-detail-container');
        if (!menuGrid || !detailContainer) return;

        menuGrid.classList.add('hidden');
        detailContainer.classList.remove('hidden');

        let content = '';
        const backBtn = `
            <button onclick="document.getElementById('vecinos-menu-grid').classList.remove('hidden'); document.getElementById('vecinos-detail-container').classList.add('hidden');" class="mb-6 text-indigo-600 hover:text-indigo-700 font-bold flex items-center gap-2">
                <i class="fas fa-arrow-left"></i> Volver al menú
            </button>
        `;

        switch (subPageId) {
            case 'registro-familiar':
                content = `
                    ${backBtn}
                    <div class="flex justify-between items-center mb-6">
                        <h2 class="text-2xl font-bold text-slate-900 dark:text-white">Registro Familiar</h2>
                        <button onclick="showAddMemberForm()" class="bg-indigo-600 text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-indigo-700 transition-colors">
                            <i class="fas fa-plus mr-2"></i> Agregar Integrante
                        </button>
                    </div>
                    <div class="space-y-4" id="family-list">
                        ${familyMembers.map(member => `
                            <div class="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 flex justify-between items-center">
                                <div class="flex items-center gap-4">
                                    <div class="w-10 h-10 bg-slate-100 dark:bg-slate-700 rounded-full flex items-center justify-center">
                                        <i class="fas fa-user text-slate-400"></i>
                                    </div>
                                    <div>
                                        <p class="font-bold text-slate-900 dark:text-white">${member.name}</p>
                                        <p class="text-xs text-slate-500">${member.relationship} - RUT: ${member.rut}</p>
                                    </div>
                                </div>
                                <span class="px-3 py-1 bg-green-100 text-green-700 text-xs rounded-full font-bold">${member.status}</span>
                            </div>
                        `).join('')}
                    </div>
                `;
                break;
            case 'mascotas':
                content = `
                    ${backBtn}
                    <div class="flex justify-between items-center mb-6">
                        <h2 class="text-2xl font-bold text-slate-900 dark:text-white">Mis Mascotas</h2>
                        <button onclick="showAddPetForm()" class="bg-indigo-600 text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-indigo-700 transition-colors">
                            <i class="fas fa-plus mr-2"></i> Inscribir Mascota
                        </button>
                    </div>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4" id="pets-list">
                        ${pets.map(pet => `
                            <div class="p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center gap-4">
                                <div class="w-16 h-16 bg-indigo-50 dark:bg-indigo-900/20 rounded-full flex items-center justify-center">
                                    <i class="fas fa-${pet.species === 'Perro' ? 'dog' : 'cat'} text-3xl text-indigo-600 dark:text-indigo-400"></i>
                                </div>
                                <div class="flex-grow">
                                    <h3 class="font-bold text-slate-900 dark:text-white">${pet.name}</h3>
                                    <p class="text-xs text-slate-500">${pet.species} - ${pet.breed}</p>
                                    <div class="flex gap-2 mt-2">
                                        <span class="text-[10px] ${pet.status === 'Vacunas al día' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'} px-2 py-0.5 rounded-full font-bold">${pet.status}</span>
                                        ${pet.chip !== 'N/A' ? `<span class="text-[10px] bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full font-bold">Chip: ${pet.chip.substring(0, 3)}...</span>` : ''}
                                    </div>
                                </div>
                                <button onclick="showPetDetail(${pet.id})" class="p-2 text-slate-400 hover:text-indigo-600 transition-colors">
                                    <i class="fas fa-chevron-right"></i>
                                </button>
                            </div>
                        `).join('')}
                    </div>
                `;
                break;
            case 'tramites-realizados':
                content = `
                    ${backBtn}
                    <h2 class="text-2xl font-bold text-slate-900 dark:text-white mb-6">Historial de Trámites</h2>
                    <div class="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
                        <table class="w-full text-left border-collapse">
                            <thead>
                                <tr class="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-700">
                                    <th class="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Fecha</th>
                                    <th class="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Trámite</th>
                                    <th class="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Estado</th>
                                    <th class="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Acción</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-slate-100 dark:divide-slate-800">
                                ${tramites.map(t => `
                                    <tr>
                                        <td class="py-4 px-6 text-sm text-slate-600 dark:text-slate-400">${t.date}</td>
                                        <td class="py-4 px-6 text-sm font-bold text-slate-900 dark:text-white">${t.title}</td>
                                        <td class="py-4 px-6 text-sm">
                                            <span class="px-2 py-1 ${t.status === 'Completado' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'} text-[10px] rounded-full font-bold">${t.status}</span>
                                        </td>
                                        <td class="py-4 px-6 text-sm">
                                            <button onclick="showTramiteDetail(${t.id})" class="text-indigo-600 font-bold hover:underline">Ver detalle</button>
                                        </td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>
                `;
                break;
            case 'descarga-documentos':
                content = `
                    ${backBtn}
                    <h2 class="text-2xl font-bold text-slate-900 dark:text-white mb-6">Descarga de Documentos</h2>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div class="p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 flex justify-between items-center group hover:border-indigo-500 transition-colors">
                            <div class="flex items-center gap-4">
                                <div class="w-12 h-12 bg-red-50 dark:bg-red-900/20 rounded-xl flex items-center justify-center">
                                    <i class="fas fa-file-pdf text-red-500 text-xl"></i>
                                </div>
                                <div>
                                    <p class="font-bold text-slate-900 dark:text-white">Certificado de Residencia</p>
                                    <p class="text-[10px] text-slate-500">PDF - 1.2 MB • Generado: 12/05/2024</p>
                                </div>
                            </div>
                            <button onclick="downloadDocument('Certificado_Residencia.pdf')" class="w-10 h-10 bg-slate-50 dark:bg-slate-700 rounded-lg flex items-center justify-center text-slate-400 hover:bg-indigo-600 hover:text-white transition-all">
                                <i class="fas fa-download"></i>
                            </button>
                        </div>
                        <div class="p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 flex justify-between items-center group hover:border-indigo-500 transition-colors">
                            <div class="flex items-center gap-4">
                                <div class="w-12 h-12 bg-red-50 dark:bg-red-900/20 rounded-xl flex items-center justify-center">
                                    <i class="fas fa-file-pdf text-red-500 text-xl"></i>
                                </div>
                                <div>
                                    <p class="font-bold text-slate-900 dark:text-white">Permiso de Circulación 2024</p>
                                    <p class="text-[10px] text-slate-500">PDF - 2.5 MB • Generado: 15/03/2024</p>
                                </div>
                            </div>
                            <button onclick="downloadDocument('Permiso_Circulacion_2024.pdf')" class="w-10 h-10 bg-slate-50 dark:bg-slate-700 rounded-lg flex items-center justify-center text-slate-400 hover:bg-indigo-600 hover:text-white transition-all">
                                <i class="fas fa-download"></i>
                            </button>
                        </div>
                    </div>
                `;
                break;
            case 'cambio-clave':
                content = `
                    ${backBtn}
                    <h2 class="text-2xl font-bold text-slate-900 dark:text-white mb-6">Cambio de Contraseña</h2>
                    <div class="max-w-md bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700">
                        <form class="space-y-4" onsubmit="event.preventDefault(); alert('Contraseña actualizada con éxito. Se ha enviado un correo de confirmación.'); renderVecinosPage();">
                            <div>
                                <label class="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">Contraseña Actual</label>
                                <input type="password" class="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500" required>
                            </div>
                            <div>
                                <label class="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">Nueva Contraseña</label>
                                <input type="password" class="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500" required>
                            </div>
                            <div>
                                <label class="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">Confirmar Nueva Contraseña</label>
                                <input type="password" class="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500" required>
                            </div>
                            <button type="submit" class="w-full py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition shadow-md mt-4">
                                Actualizar Contraseña
                            </button>
                        </form>
                    </div>
                `;
                break;
        }

        detailContainer.innerHTML = content;
    }

    function showAddMemberForm() {
        const detailContainer = document.getElementById('vecinos-detail-container');
        if (!detailContainer) return;

        detailContainer.innerHTML = `
            <button onclick="renderVecinosSubPage('registro-familiar')" class="mb-6 text-indigo-600 hover:text-indigo-700 font-bold flex items-center gap-2">
                <i class="fas fa-arrow-left"></i> Volver al registro
            </button>
            <h2 class="text-2xl font-bold text-slate-900 dark:text-white mb-6">Cuestionario: Nuevo Integrante</h2>
            <div class="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700">
                <form id="add-member-form" class="space-y-4">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label class="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">Nombre Completo</label>
                            <input type="text" name="name" class="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500" required>
                        </div>
                        <div>
                            <label class="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">RUT</label>
                            <input type="text" name="rut" placeholder="12.345.678-9" class="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500" required>
                        </div>
                        <div>
                            <label class="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">Parentesco</label>
                            <select name="relationship" class="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500">
                                <option>Hijo/a</option>
                                <option>Padre/Madre</option>
                                <option>Hermano/a</option>
                                <option>Otro</option>
                            </select>
                        </div>
                        <div>
                            <label class="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">Fecha de Nacimiento</label>
                            <input type="date" name="birthdate" class="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500" required>
                        </div>
                    </div>
                    <div class="space-y-4 mt-6">
                        <h3 class="font-bold text-slate-900 dark:text-white border-b pb-2">Información Adicional</h3>
                        <div class="flex items-center gap-3">
                            <input type="checkbox" id="disability" class="w-5 h-5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500">
                            <label for="disability" class="text-sm text-slate-700 dark:text-slate-300">¿Posee alguna discapacidad?</label>
                        </div>
                        <div class="flex items-center gap-3">
                            <input type="checkbox" id="student" class="w-5 h-5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500">
                            <label for="student" class="text-sm text-slate-700 dark:text-slate-300">¿Es estudiante regular?</label>
                        </div>
                    </div>
                    <button type="submit" class="w-full py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition shadow-md mt-6">
                        Finalizar Inscripción
                    </button>
                </form>
            </div>
        `;

        document.getElementById('add-member-form')?.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(e.target as HTMLFormElement);
            const newMember = {
                id: familyMembers.length + 1,
                name: formData.get('name') as string,
                relationship: formData.get('relationship') as string,
                rut: formData.get('rut') as string,
                status: 'Pendiente de Validación'
            };
            familyMembers.push(newMember);
            alert('Integrante agregado con éxito. La validación tomará hasta 48 horas hábiles.');
            renderVecinosSubPage('registro-familiar');
        });
    }

    function showAddPetForm() {
        const detailContainer = document.getElementById('vecinos-detail-container');
        if (!detailContainer) return;

        detailContainer.innerHTML = `
            <button onclick="renderVecinosSubPage('mascotas')" class="mb-6 text-indigo-600 hover:text-indigo-700 font-bold flex items-center gap-2">
                <i class="fas fa-arrow-left"></i> Volver a mascotas
            </button>
            <h2 class="text-2xl font-bold text-slate-900 dark:text-white mb-6">Inscripción de Mascota</h2>
            <div class="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700">
                <form id="add-pet-form" class="space-y-4">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label class="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">Nombre de la Mascota</label>
                            <input type="text" name="name" class="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500" required>
                        </div>
                        <div>
                            <label class="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">Especie</label>
                            <select name="species" class="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500">
                                <option>Perro</option>
                                <option>Gato</option>
                                <option>Otro</option>
                            </select>
                        </div>
                        <div>
                            <label class="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">Raza</label>
                            <input type="text" name="breed" class="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500" required>
                        </div>
                        <div>
                            <label class="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">Número de Chip (opcional)</label>
                            <input type="text" name="chip" class="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500">
                        </div>
                    </div>
                    <button type="submit" class="w-full py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition shadow-md mt-6">
                        Registrar Mascota
                    </button>
                </form>
            </div>
        `;

        document.getElementById('add-pet-form')?.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(e.target as HTMLFormElement);
            const newPet = {
                id: pets.length + 1,
                name: formData.get('name') as string,
                species: formData.get('species') as string,
                breed: formData.get('breed') as string,
                status: 'Registrado',
                chip: (formData.get('chip') as string) || 'N/A',
                age: 'N/A',
                weight: 'N/A',
                lastVax: 'N/A'
            };
            pets.push(newPet);
            alert('Mascota registrada con éxito.');
            renderVecinosSubPage('mascotas');
        });
    }

    function showPetDetail(petId) {
        const pet = pets.find(p => p.id === petId);
        if (!pet) return;

        const detailContainer = document.getElementById('vecinos-detail-container');
        if (!detailContainer) return;

        detailContainer.innerHTML = `
            <button onclick="renderVecinosSubPage('mascotas')" class="mb-6 text-indigo-600 hover:text-indigo-700 font-bold flex items-center gap-2">
                <i class="fas fa-arrow-left"></i> Volver a mascotas
            </button>
            <div class="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
                <div class="bg-indigo-600 p-8 text-center text-white">
                    <div class="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <i class="fas fa-${pet.species === 'Perro' ? 'dog' : 'cat'} text-5xl"></i>
                    </div>
                    <h2 class="text-3xl font-bold">${pet.name}</h2>
                    <p class="opacity-80">${pet.species} • ${pet.breed}</p>
                </div>
                <div class="p-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div class="p-4 bg-slate-50 dark:bg-slate-900 rounded-xl">
                        <p class="text-xs text-slate-500 uppercase font-bold mb-1">Edad</p>
                        <p class="font-bold text-slate-900 dark:text-white">${pet.age}</p>
                    </div>
                    <div class="p-4 bg-slate-50 dark:bg-slate-900 rounded-xl">
                        <p class="text-xs text-slate-500 uppercase font-bold mb-1">Peso</p>
                        <p class="font-bold text-slate-900 dark:text-white">${pet.weight}</p>
                    </div>
                    <div class="p-4 bg-slate-50 dark:bg-slate-900 rounded-xl">
                        <p class="text-xs text-slate-500 uppercase font-bold mb-1">Chip</p>
                        <p class="font-bold text-slate-900 dark:text-white">${pet.chip}</p>
                    </div>
                    <div class="p-4 bg-slate-50 dark:bg-slate-900 rounded-xl">
                        <p class="text-xs text-slate-500 uppercase font-bold mb-1">Últ. Vacuna</p>
                        <p class="font-bold text-slate-900 dark:text-white">${pet.lastVax}</p>
                    </div>
                </div>
                <div class="p-6 border-t border-slate-100 dark:border-slate-700">
                    <h3 class="font-bold text-slate-900 dark:text-white mb-4">Acciones Disponibles</h3>
                    <div class="flex flex-wrap gap-3">
                        <button onclick="alert('Funcionalidad: Agendando hora veterinaria para ${pet.name}...')" class="bg-indigo-50 text-indigo-600 px-4 py-2 rounded-xl text-sm font-bold hover:bg-indigo-100 transition-colors">
                            <i class="fas fa-calendar-alt mr-2"></i> Agendar Veterinaria
                        </button>
                        <button onclick="alert('Descargando Carnet de Vacunación de ${pet.name}...')" class="bg-slate-100 text-slate-700 px-4 py-2 rounded-xl text-sm font-bold hover:bg-slate-200 transition-colors">
                            <i class="fas fa-file-medical mr-2"></i> Carnet Vacunas
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    function showTramiteDetail(tramiteId) {
        const t = tramites.find(item => item.id === tramiteId);
        if (!t) return;

        const detailContainer = document.getElementById('vecinos-detail-container');
        if (!detailContainer) return;

        detailContainer.innerHTML = `
            <button onclick="renderVecinosSubPage('tramites-realizados')" class="mb-6 text-indigo-600 hover:text-indigo-700 font-bold flex items-center gap-2">
                <i class="fas fa-arrow-left"></i> Volver al historial
            </button>
            <div class="bg-white dark:bg-slate-800 p-8 rounded-2xl border border-slate-200 dark:border-slate-700">
                <div class="flex justify-between items-start mb-6">
                    <div>
                        <h2 class="text-2xl font-bold text-slate-900 dark:text-white">${t.title}</h2>
                        <p class="text-slate-500">Solicitado el ${t.date}</p>
                    </div>
                    <span class="px-3 py-1 ${t.status === 'Completado' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'} rounded-full font-bold text-xs">
                        ${t.status}
                    </span>
                </div>
                <div class="bg-slate-50 dark:bg-slate-900 p-6 rounded-xl mb-6">
                    <h3 class="font-bold text-slate-900 dark:text-white mb-2">Detalle del Trámite</h3>
                    <p class="text-slate-600 dark:text-slate-400">${t.detail}</p>
                </div>
                <div class="space-y-4">
                    <h3 class="font-bold text-slate-900 dark:text-white">Documentos Asociados</h3>
                    <div class="flex items-center justify-between p-3 border border-slate-100 dark:border-slate-700 rounded-xl">
                        <div class="flex items-center gap-3">
                            <i class="fas fa-file-pdf text-red-500"></i>
                            <span class="text-sm font-medium">Comprobante_Solicitud.pdf</span>
                        </div>
                        <button onclick="downloadDocument('Comprobante_Solicitud.pdf')" class="text-indigo-600 hover:underline text-sm font-bold">Descargar</button>
                    </div>
                </div>
            </div>
        `;
    }

    function downloadDocument(filename) {
        alert(`Iniciando descarga de: ${filename}. El archivo se guardará en su carpeta de descargas.`);
        // Simulate a delay
        setTimeout(() => {
            console.log(`Descarga de ${filename} completada.`);
        }, 1000);
    }

    // Expose new functions to window
    (window as any).showAddMemberForm = showAddMemberForm;
    (window as any).showAddPetForm = showAddPetForm;
    (window as any).showPetDetail = showPetDetail;
    (window as any).showTramiteDetail = showTramiteDetail;
    (window as any).downloadDocument = downloadDocument;

    // Expose sub-page renderer to window
    (window as any).renderVecinosSubPage = renderVecinosSubPage;

    // --- MODAL VECINOS LOGIC ---
    const vecinosModal = document.getElementById('vecinos-modal');
    const vecinosModalClose = document.getElementById('vecinos-modal-close');
    const logoutBtn = document.getElementById('logout-btn');

    function toggleVecinosModal(show) {
        if (show) {
            vecinosModal?.classList.remove('hidden');
            vecinosModal?.classList.add('flex');
            renderVecinosPage();
        } else {
            vecinosModal?.classList.add('hidden');
            vecinosModal?.classList.remove('flex');
        }
    }

    vecinosModalClose?.addEventListener('click', () => toggleVecinosModal(false));
    vecinosModal?.addEventListener('click', (e) => { if (e.target === vecinosModal) toggleVecinosModal(false); });
    logoutBtn?.addEventListener('click', () => {
        if (confirm('¿Estás seguro que deseas cerrar sesión?')) {
            toggleVecinosModal(false);
            alert('Sesión cerrada correctamente.');
            showPage('home');
        }
    });

    function renderDirectoryPage(dataList: string[], pageTitle: string, description: string) {
        if (!pageContentWrapper) return;

        // Sort the list alphabetically (Spanish locale aware)
        const sortedList = [...dataList].sort((a, b) => a.localeCompare(b, 'es'));

        // Group by First Letter
        const groupedServices = sortedList.reduce((acc: any, service: string) => {
            const firstLetter = service.charAt(0).toUpperCase();
            // Ignore non-letters if any or ensure valid grouping
            if (/[A-ZÑ]/.test(firstLetter)) {
                if (!acc[firstLetter]) {
                    acc[firstLetter] = [];
                }
                acc[firstLetter].push(service);
            }
            return acc;
        }, {});

        // Generate HTML
        let directoryHTML = `
            <section id="directory-page" class="page-section">
                <div class="mb-8">
                     <button onclick="window.showPage('home')" class="mb-4 text-[var(--color-primary)] hover:underline font-bold flex items-center gap-1">
                        <i class="fas fa-arrow-left"></i> Volver al Inicio
                    </button>
                    <h2 class="text-3xl font-extrabold text-[var(--color-primary)] border-b-4 border-[var(--lf-yellow)] inline-block pb-1">${pageTitle}</h2>
                    <p class="text-[var(--text-primary)] mt-2 text-lg font-medium">${description}</p>
                </div>
                
                <div class="bg-[var(--bg-secondary)] p-6 md:p-10 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
        `;

        const alphabet = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ".split("");
        
        alphabet.forEach(letter => {
            if (groupedServices[letter]) {
                directoryHTML += `
                    <div class="mb-10 animate-fade-in">
                        <div class="flex items-center gap-4 mb-6 border-b-2 border-[var(--lf-yellow)] pb-2">
                            <h3 class="text-5xl font-extrabold text-[var(--color-primary)]">${letter}</h3>
                        </div>
                        <ul class="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
                            ${groupedServices[letter].map((service: string) => `
                                <li class="text-lg text-[var(--text-primary)] hover:text-[var(--color-primary)] transition-colors cursor-pointer py-1 flex items-start group">
                                     <span class="mr-3 mt-2 w-1.5 h-1.5 rounded-full bg-gray-400 group-hover:bg-[var(--lf-yellow)] transition-colors flex-shrink-0"></span>
                                    <span class="font-medium group-hover:translate-x-1 transition-transform leading-snug text-gray-900 dark:text-gray-100">${service}</span>
                                </li>
                            `).join('')}
                        </ul>
                    </div>
                `;
            }
        });

        directoryHTML += `
                </div>
            </section>
        `;

        pageContentWrapper.innerHTML = directoryHTML;
    }
    
    function renderSolicitudPage() {
        if (!pageContentWrapper) return;
        
        pageContentWrapper.innerHTML = `
            <section id="solicitud-page" class="page-section max-w-3xl mx-auto">
                <div class="mb-8 text-center">
                    <h2 class="text-3xl font-extrabold text-[var(--color-primary)] border-b-4 border-[var(--lf-yellow)] inline-block pb-1">Solicitud de Servicios</h2>
                    <p class="text-gray-900 mt-2 text-lg dark:text-white font-medium">Cuéntanos qué necesitas y gestionaremos tu solicitud.</p>
                </div>

                <div class="bg-[var(--bg-secondary)] p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
                    <form id="solicitud-form" class="space-y-6">
                        <div>
                            <label for="tipo-solicitud" class="block text-gray-900 font-bold mb-2 dark:text-white">Tipo de Solicitud</label>
                            <select id="tipo-solicitud" class="w-full p-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[var(--color-primary)] outline-none" required>
                                <option value="">Selecciona una opción...</option>
                                <option value="tramite">Trámite Municipal</option>
                                <option value="taller">Inscripción a Taller</option>
                                <option value="programa">Postulación a Programa</option>
                                <option value="servicio">Servicio Comunitario (Aseo, Seguridad, etc.)</option>
                                <option value="otro">Otro requerimiento</option>
                            </select>
                        </div>

                        <div>
                            <label for="sector" class="block text-gray-900 font-bold mb-2 dark:text-white">Sector de la Comuna</label>
                            <select id="sector" class="w-full p-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[var(--color-primary)] outline-none" required>
                                <option value="">Selecciona tu sector...</option>
                                <option value="norte">Sector Norte</option>
                                <option value="sur">Sector Sur</option>
                                <option value="poniente">Sector Poniente</option>
                                <option value="oriente">Sector Oriente (Precordillera)</option>
                                <option value="centro">Centro Cívico</option>
                            </select>
                        </div>

                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label for="nombre" class="block text-gray-900 font-bold mb-2 dark:text-white">Nombre Completo</label>
                                <input type="text" id="nombre" class="w-full p-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[var(--color-primary)] outline-none" placeholder="Tu nombre" required />
                            </div>
                            <div>
                                <label for="rut" class="block text-gray-900 font-bold mb-2 dark:text-white">RUT</label>
                                <input type="text" id="rut" class="w-full p-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[var(--color-primary)] outline-none" placeholder="12.345.678-9" />
                            </div>
                        </div>

                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label for="telefono" class="block text-gray-900 font-bold mb-2 dark:text-white">Teléfono de Contacto</label>
                                <input type="tel" id="telefono" class="w-full p-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[var(--color-primary)] outline-none" placeholder="+569..." required />
                            </div>
                            <div>
                                <label for="email" class="block text-gray-900 font-bold mb-2 dark:text-white">Correo Electrónico</label>
                                <input type="email" id="email" class="w-full p-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[var(--color-primary)] outline-none" placeholder="ejemplo@correo.com" required />
                            </div>
                        </div>

                        <div>
                            <label for="descripcion" class="block text-gray-900 font-bold mb-2 dark:text-white">Descripción de la Solicitud</label>
                            <textarea id="descripcion" rows="4" class="w-full p-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[var(--color-primary)] outline-none" placeholder="Detalla qué necesitas específicamente..." required></textarea>
                        </div>

                         <div>
                            <label class="block text-gray-900 font-bold mb-2 dark:text-white">Nivel de Urgencia</label>
                            <div class="flex gap-4">
                                <label class="flex items-center gap-2 cursor-pointer">
                                    <input type="radio" name="urgencia" value="baja" class="text-[var(--color-primary)] focus:ring-[var(--color-primary)]" checked />
                                    <span class="text-gray-900 dark:text-white">Normal</span>
                                </label>
                                <label class="flex items-center gap-2 cursor-pointer">
                                    <input type="radio" name="urgencia" value="media" class="text-[var(--lf-yellow)] focus:ring-[var(--lf-yellow)]" />
                                    <span class="text-gray-900 dark:text-white">Media</span>
                                </label>
                                <label class="flex items-center gap-2 cursor-pointer">
                                    <input type="radio" name="urgencia" value="alta" class="text-[var(--lf-red)] focus:ring-[var(--lf-red)]" />
                                    <span class="text-gray-900 dark:text-white">Alta</span>
                                </label>
                            </div>
                        </div>

                        <div class="pt-4">
                            <button type="submit" class="w-full bg-[var(--color-primary)] text-white font-bold py-4 rounded-xl hover:bg-blue-700 transition shadow-lg transform hover:-translate-y-1 flex items-center justify-center gap-2">
                                <i class="fas fa-paper-plane"></i> Enviar Solicitud
                            </button>
                        </div>
                    </form>
                </div>
            </section>
        `;
        
        document.getElementById('solicitud-form')?.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = (e.target as HTMLFormElement).querySelector('button');
            const originalText = btn.innerHTML;
            btn.disabled = true;
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
            
            setTimeout(() => {
                alert("¡Solicitud enviada con éxito! Nos pondremos en contacto contigo a la brevedad.");
                btn.disabled = false;
                btn.innerHTML = originalText;
                (e.target as HTMLFormElement).reset();
                showPage('home');
            }, 1500);
        });
    }

    // ... (Render functions remains the same) ...
    function renderServiceCard(service: any, category: string) {
        if (category === 'municipio') {
            const isAlcalde = service.title.toLowerCase().includes('alcalde');
            const contactLines = service.details.como ? service.details.como.split('|') : [];
            
            const contactList = contactLines.map((info: string) => {
                let iconClass = 'fa-info-circle';
                const lowerInfo = info.toLowerCase();
                if (lowerInfo.includes('email') || lowerInfo.includes('correo')) iconClass = 'fa-envelope';
                else if (lowerInfo.includes('celular') || lowerInfo.includes('fono')) iconClass = 'fa-mobile-alt';
                else if (lowerInfo.includes('anexo')) iconClass = 'fa-phone-alt';
                
                return `<li class="flex items-start gap-2 mb-1"><i class="fas ${iconClass} text-[var(--color-primary)] mt-1 w-4"></i> <span class="text-sm text-gray-900 font-medium dark:text-white">${info.trim()}</span></li>`;
            }).join('');

            if (isAlcalde) {
                return `
                    <div class="service-page-card group cursor-pointer" data-service-title="${service.title}" data-category="${category}">
                        <div class="flex flex-col h-full">
                            <h3 class="group-hover:text-[var(--color-primary)] transition-colors text-xl mb-1 text-gray-900 dark:text-white font-bold">${service.title}</h3>
                            <p class="text-xs font-bold text-[var(--color-primary)] uppercase tracking-wide mb-3">${service.tagline}</p>
                            
                            <ul class="mb-4 flex-grow">
                                ${contactList}
                            </ul>
                            
                            <div class="mt-auto pt-3 border-t border-gray-200 dark:border-gray-700">
                                <button class="w-full bg-[var(--color-primary)] text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition flex items-center justify-center gap-2">
                                    <i class="fas fa-book-open"></i> Ver Biografía
                                </button>
                            </div>
                        </div>
                    </div>
                `;
            } else {
                return `
                    <div class="service-page-card group cursor-default">
                        <div class="flex flex-col h-full">
                            <h3 class="text-gray-900 text-xl mb-1 dark:text-white font-bold">${service.title}</h3>
                            <p class="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wide mb-3">${service.tagline}</p>
                            
                            <ul class="mb-2">
                                ${contactList}
                            </ul>
                        </div>
                    </div>
                `;
            }
        }

         const serviceItems = [
            service.publico ? `Público: ${service.publico.join(', ')}` : null,
            service.tipo ? `Tipo: ${service.tipo}` : null
        ].filter(Boolean).slice(0, 2);

        return `
            <div class="service-page-card group" data-service-title="${service.title}" data-category="${category}">
                <div>
                    <h3 class="group-hover:text-[var(--color-primary)] transition-colors text-gray-900 dark:text-white font-bold">${service.title.toUpperCase()}</h3>
                    <ul class="mb-3 text-gray-900 dark:text-white font-medium">
                        ${serviceItems.map(item => `<li><i class="fas fa-check-circle text-green-500" aria-hidden="true"></i> ${item}</li>`).join('')}
                    </ul>
                </div>
                <div class="card-footer mt-auto pt-3 border-t border-gray-200 dark:border-gray-700">
                    <span class="font-bold text-[var(--color-primary)] block mt-2">Ver más...</span>
                </div>
            </div>
        `;
    }

    function addCardClickListeners(category) {
        document.querySelectorAll(`#${category}-service-list .service-page-card`).forEach(card => {
            card.addEventListener('click', (e) => {
                const serviceTitle = (card as HTMLElement).dataset.serviceTitle;
                if (serviceTitle) {
                    renderServiceDetail(serviceTitle, category);
                }
            });
        });
    }

    function renderFilteredServices(category) {
        const services = servicesData[category] || [];
        const publicoFilter = (document.getElementById(`${category}-filter-publico`) as HTMLSelectElement).value;
        const tipoFilter = (document.getElementById(`${category}-filter-tipo`) as HTMLSelectElement).value;

        const filteredServices = services.filter(s => {
            const publicoMatch = !publicoFilter || (s.publico && s.publico.includes(publicoFilter));
            const tipoMatch = !tipoFilter || s.tipo === tipoFilter;
            return publicoMatch && tipoMatch;
        });

        const listContainer = document.getElementById(`${category}-service-list`);
        if (listContainer) {
            listContainer.innerHTML = filteredServices.length > 0 
                ? filteredServices.map(service => renderServiceCard(service, category)).join('')
                : `<p class="text-gray-900 md:col-span-3 text-center font-medium dark:text-white">No se encontraron servicios que coincidan con los filtros seleccionados.</p>`;
            addCardClickListeners(category);
        }
    }
    
    function renderServicePage(category: string) {
        const services = servicesData[category] || [];
        const uniquePublicos = [...new Set(services.flatMap((s: any) => s.publico || []))].sort();
        const uniqueTipos = [...new Set(services.map((s: any) => s.tipo).filter(Boolean))].sort();

        let customHeaderHTML = '';

        const filtersHTML = `
            <div class="service-filters bg-[var(--bg-card)] p-4 rounded-xl shadow-sm mb-8 grid grid-cols-1 md:grid-cols-3 gap-4 items-center border border-[var(--border-primary)]">
                <div class="md:col-span-1 font-bold text-[var(--color-primary)] text-lg">Filtrar servicios:</div>
                <select id="${category}-filter-publico" name="publico" class="w-full p-2 rounded-lg filter-select border border-gray-400 dark:border-gray-600 text-gray-900 font-medium">
                    <option value="">Todo Público</option>
                    ${uniquePublicos.map(p => `<option value="${p}">${p}</option>`).join('')}
                </select>
                <select id="${category}-filter-tipo" name="tipo" class="w-full p-2 rounded-lg filter-select border border-gray-400 dark:border-gray-600 text-gray-900 font-medium">
                    <option value="">Todo Tipo</option>
                    ${uniqueTipos.map(t => `<option value="${t}">${t}</option>`).join('')}
                </select>
            </div>
        `;

        const pageHTML = `
            <section id="${category}-page" class="page-section">
                ${customHeaderHTML}
                <div class="mb-6">
                    <h2 class="text-3xl font-extrabold text-[var(--color-primary)] border-b-4 border-[var(--lf-yellow)] inline-block pb-1">${categoryTitles[category]}</h2>
                    <p class="text-gray-900 mt-2 text-lg dark:text-white font-medium">Encuentra los servicios y trámites disponibles.</p>
                </div>
                ${filtersHTML}
                <div id="${category}-service-list" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    ${services.map(service => renderServiceCard(service, category)).join('')}
                </div>
                <div id="${category}-service-detail" class="hidden"></div>
            </section>
        `;
        if (pageContentWrapper) pageContentWrapper.innerHTML = pageHTML;

        addCardClickListeners(category);

        document.getElementById(`${category}-filter-publico`)?.addEventListener('change', () => renderFilteredServices(category));
        document.getElementById(`${category}-filter-tipo`)?.addEventListener('change', () => renderFilteredServices(category));
    }

    function renderMayorProfile(service, category) {
        const categoryTitles = {
            "pagos": "Portal de Pagos",
            "tramites": "Trámites Municipales",
            "comuna": "Vivir en la Florida",
            "personas": "Personas y Familia",
            "salud": "Salud y Educación",
            "cultura": "Cultura y Deporte",
            "desarrollo": "Desarrollo y Emprendimiento",
            "municipio": "Tu Municipalidad"
        };

        const detailHTML = `
            <button class="back-to-list-btn mb-6 text-[var(--color-primary)] font-bold flex items-center gap-2 hover:underline text-lg" data-category="${category}">
                <i class="fas fa-arrow-left" aria-hidden="true"></i> Volver a ${categoryTitles[category]}
            </button>
            
            <div class="animate-fade-in bg-[var(--bg-secondary)] rounded-2xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-700">
                <div class="bg-gradient-to-r from-[var(--color-primary)] to-[var(--lf-green)] p-8 md:p-12 text-white relative">
                    <div class="absolute top-0 right-0 opacity-10">
                        <i class="fas fa-building text-9xl transform translate-x-10 -translate-y-10"></i>
                    </div>
                    <div class="relative z-10 flex flex-col md:flex-row items-center gap-8">
                        <div class="w-32 h-32 md:w-40 md:h-40 bg-white rounded-full flex items-center justify-center text-[var(--color-primary)] shadow-2xl border-4 border-white">
                            <i class="fas fa-user-tie text-6xl"></i>
                        </div>
                        <div class="text-center md:text-left">
                            <h1 class="text-4xl md:text-5xl font-extrabold mb-2">${service.title}</h1>
                            <p class="text-xl font-medium opacity-90 mb-4">Alcalde 2024 - 2028</p>
                            <div class="flex flex-wrap gap-3 justify-center md:justify-start">
                                <a href="mailto:alcalde@laflorida.cl" class="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-full text-sm font-bold backdrop-blur-sm transition border border-white/30">
                                    <i class="fas fa-envelope mr-2"></i> alcalde@laflorida.cl
                                </a>
                                <a href="mailto:evalenzuela@laflorida.cl" class="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-full text-sm font-bold backdrop-blur-sm transition border border-white/30">
                                    <i class="fas fa-envelope mr-2"></i> Secretaria
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="p-8 md:p-12 space-y-10">
                    <section>
                        <h2 class="text-2xl font-bold text-[var(--color-primary)] mb-4 flex items-center gap-2">
                            <i class="fas fa-quote-left text-[var(--lf-yellow)]"></i> Resumen Ejecutivo
                        </h2>
                        <div class="text-lg text-gray-900 dark:text-white leading-relaxed bg-blue-50 dark:bg-slate-800/50 p-6 rounded-xl border-l-4 border-[var(--color-primary)] font-medium">
                            <p class="whitespace-pre-line">${service.details.consiste}</p>
                        </div>
                    </section>

                    <section>
                        <h2 class="text-2xl font-bold text-[var(--color-primary)] mb-6 flex items-center gap-2">
                            <i class="fas fa-graduation-cap text-[var(--lf-red)]"></i> Formación Académica
                        </h2>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            ${service.details.formacion.map(edu => `
                                <div class="bg-white dark:bg-slate-700 p-5 rounded-xl border border-gray-200 dark:border-gray-600 shadow-sm hover:shadow-md transition flex items-start gap-4">
                                    <div class="bg-[var(--lf-red)]/10 p-3 rounded-lg text-[var(--lf-red)]">
                                        <i class="fas fa-university text-xl"></i>
                                    </div>
                                    <div>
                                        <h4 class="font-bold text-gray-900 dark:text-white text-lg">${edu.titulo}</h4>
                                        <p class="text-gray-900 dark:text-white font-medium">${edu.institucion}</p>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </section>

                    <section>
                        <h2 class="text-2xl font-bold text-[var(--color-primary)] mb-6 flex items-center gap-2">
                            <i class="fas fa-briefcase text-[var(--lf-green)]"></i> Trayectoria Profesional y Municipal
                        </h2>
                        <p class="text-gray-900 dark:text-white mb-6 text-lg font-medium">Antes de asumir la alcaldía, Reyes construyó una carrera técnica y administrativa de más de una década (2011–2024) al interior de la Municipalidad de La Florida.</p>
                        
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            ${service.details.trayectoria.map(role => {
                                const parts = role.split(':');
                                const title = parts[0];
                                const desc = parts[1] || '';
                                return `
                                <div class="bg-white dark:bg-slate-700 p-5 rounded-xl border border-gray-200 dark:border-gray-600 shadow-sm hover:border-[var(--lf-green)] transition group">
                                    <div class="flex items-start gap-3">
                                        <div class="mt-1 bg-[var(--lf-green)] text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition">
                                            <i class="fas fa-check"></i>
                                        </div>
                                        <div>
                                            <h4 class="font-bold text-gray-900 dark:text-white">${title}</h4>
                                            <p class="text-sm text-gray-900 dark:text-white mt-1 font-medium">${desc}</p>
                                        </div>
                                    </div>
                                </div>
                                `;
                            }).join('')}
                        </div>
                    </section>

                    <section>
                        <h2 class="text-2xl font-bold text-[var(--color-primary)] mb-6 flex items-center gap-2">
                            <i class="fas fa-envelope-open-text text-[var(--lf-yellow)]"></i> Contacto Directo
                        </h2>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            ${service.details.contactos ? service.details.contactos.map(contact => `
                                <div class="bg-white dark:bg-slate-700 p-5 rounded-xl border border-gray-200 dark:border-gray-600 shadow-sm hover:border-[var(--lf-yellow)] transition flex items-center gap-4">
                                    <div class="bg-[var(--lf-yellow)]/20 p-3 rounded-full text-[var(--color-primary)]">
                                        <i class="fas fa-paper-plane"></i>
                                    </div>
                                    <div>
                                        <h4 class="font-bold text-gray-900 dark:text-white">${contact.cargo}</h4>
                                        <a href="mailto:${contact.email}" class="text-[var(--color-primary)] font-bold hover:underline break-all text-lg">${contact.email}</a>
                                    </div>
                                </div>
                            `).join('') : ''}
                        </div>
                    </section>

                </div>
            </div>
        `;

        const pageContainer = document.getElementById(`${category}-page`);
        const detailContainer = document.getElementById(`${category}-service-detail`);
        
        if (pageContainer && detailContainer) {
            pageContainer.querySelector('.service-filters')?.classList.add('hidden');
            pageContainer.querySelector(`#${category}-service-list`)?.classList.add('hidden');
            
            detailContainer.innerHTML = detailHTML;
            detailContainer.classList.remove('hidden');

            detailContainer.querySelector('.back-to-list-btn').addEventListener('click', (e) => {
                const cat = (e.currentTarget as HTMLElement).dataset.category;
                (window as any).showPage(cat); 
            });
        }
    }

    function renderServiceDetail(serviceTitle, category) {
        const service = servicesData[category].find(s => s.title === serviceTitle);
        if (!service) return;

        // Custom Renderer for Mayor Profile
        if (serviceTitle.includes('Alcalde Daniel Reyes')) {
            renderMayorProfile(service, category);
            return;
        }

        // Payment button logic for detail view - Kept as requested
        const payButton = service.tipo === 'Pago' 
            ? `<button class="w-full mt-4 bg-[var(--lf-green)] text-white text-lg font-bold py-3 px-6 rounded-xl hover:bg-green-600 transition flex items-center justify-center gap-3 transform hover:-translate-y-1 shadow-lg">
                 <i class="fas fa-money-bill-wave fa-lg"></i> IR A PAGAR AHORA
               </button>`
            : '';

        const detailHTML = `
            <button class="back-to-list-btn mb-6 text-[var(--color-primary)] font-bold flex items-center gap-2 hover:underline text-lg" data-category="${category}">
                <i class="fas fa-arrow-left" aria-hidden="true"></i> Volver a ${categoryTitles[category]}
            </button>
            <article class="bg-[var(--bg-secondary)] p-8 rounded-2xl shadow-lg service-detail-view border border-gray-200 dark:border-gray-700">
                 <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div class="md:col-span-2">
                        <span class="inline-block bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100 text-xs font-bold px-3 py-1 rounded-full uppercase mb-2">${service.tipo || 'Servicio'}</span>
                        <h1 class="text-4xl font-black text-gray-900 dark:text-white mb-2 uppercase tracking-tight">${service.title}</h1>
                        <h2 class="mb-6 text-2xl font-extrabold text-[var(--color-primary)] italic">“${service.tagline}”</h2>
                        
                        <div class="prose max-w-none text-gray-900 dark:text-white text-lg leading-relaxed font-medium">
                            ${service.details.bajada ? `
                                <div class="mb-8 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl border-l-4 border-[var(--lf-green)]">
                                    <p class="text-xl italic font-semibold text-gray-700 dark:text-gray-300">${service.details.bajada}</p>
                                </div>
                            ` : ''}

                            <h3 class="text-xl font-bold text-[var(--color-primary)] mt-6 mb-2 uppercase tracking-wide border-b border-gray-200 dark:border-gray-700 pb-1">Necesidad a la que responde el servicio</h3>
                            <p class="font-medium text-gray-900 dark:text-white mb-6">${service.details.necesidad || 'No especificado.'}</p>

                            <h3 class="text-xl font-bold text-[var(--color-primary)] mt-6 mb-2 uppercase tracking-wide border-b border-gray-200 dark:border-gray-700 pb-1">Quiénes pueden acceder a este servicio</h3>
                            <p class="font-medium text-gray-900 dark:text-white mb-6">${service.details.quienes || 'No especificado.'}</p>

                            <h3 class="text-xl font-bold text-[var(--color-primary)] mt-6 mb-2 uppercase tracking-wide border-b border-gray-200 dark:border-gray-700 pb-1">Cómo se activa el servicio</h3>
                            <p class="font-medium text-gray-900 dark:text-white mb-6">${service.details.como || 'No especificado.'}</p>

                            <h3 class="text-xl font-bold text-[var(--color-primary)] mt-6 mb-2 uppercase tracking-wide border-b border-gray-200 dark:border-gray-700 pb-1">En qué consiste</h3>
                            <p class="font-medium text-gray-900 dark:text-white mb-6">${service.details.consiste || 'No especificado.'}</p>
                            
                            <h3 class="text-xl font-bold text-[var(--color-primary)] mt-6 mb-2 uppercase tracking-wide border-b border-gray-200 dark:border-gray-700 pb-1">Dónde y cómo se entrega el servicio</h3>
                            <p class="font-medium text-gray-900 dark:text-white mb-2">${service.details.donde || 'No especificado.'}</p>
                            <p class="flex items-center gap-2 font-bold text-gray-600 dark:text-gray-400 text-sm mb-6"><i class="far fa-clock"></i> Horario/Frecuencia: ${service.details.horario || 'No especificado'}</p>

                            <div class="mt-10 pt-6 border-t-2 border-dashed border-gray-200 dark:border-gray-700">
                                <p class="text-lg font-bold text-gray-500 dark:text-gray-400 italic">${service.details.concepto || 'La Florida crece contigo.'}</p>
                            </div>
                        </div>
                    </div>
                    <aside>
                        <div class="bg-[var(--bg-tertiary)] p-6 rounded-xl border border-gray-300 dark:border-gray-600 sticky top-[120px]">
                            <h4 class="font-bold text-lg mb-4 text-gray-900 dark:text-white uppercase tracking-widest border-b pb-2">Resumen</h4>
                            <ul class="space-y-4 text-sm text-gray-900 dark:text-white font-bold">
                                <li class="flex items-start gap-3">
                                    <div class="bg-[var(--color-primary)]/10 p-2 rounded-lg text-[var(--color-primary)]">
                                        <i class="fas fa-users"></i>
                                    </div>
                                    <div>
                                        <span class="text-xs text-gray-500 uppercase">Público</span>
                                        <div class="text-base">${service.publico ? service.publico.join(', ') : 'General'}</div>
                                    </div>
                                </li>
                                <li class="flex items-start gap-3">
                                    <div class="bg-[var(--color-primary)]/10 p-2 rounded-lg text-[var(--color-primary)]">
                                        <i class="fas fa-tag"></i>
                                    </div>
                                    <div>
                                        <span class="text-xs text-gray-500 uppercase">Tipo</span>
                                        <div class="text-base">${service.tipo || 'No especificado'}</div>
                                    </div>
                                </li>
                                <li class="flex items-start gap-3">
                                    <div class="bg-[var(--color-primary)]/10 p-2 rounded-lg text-[var(--color-primary)]">
                                        <i class="fas fa-laptop-house"></i>
                                    </div>
                                    <div>
                                        <span class="text-xs text-gray-500 uppercase">Modalidad</span>
                                        <div class="text-base">${service.modalidad ? service.modalidad.join(', ') : 'No especificada'}</div>
                                    </div>
                                </li>
                            </ul>
                            
                            ${payButton 
                                ? `<div class="mt-8">${payButton}</div>` 
                                : `<div class="cta-box mt-8 bg-[var(--color-primary)] text-white p-6 rounded-xl text-center shadow-lg transform hover:-translate-y-1 transition-transform cursor-pointer border border-white/20">
                                    <h4 class="font-bold text-xl">¿Te interesa?</h4>
                                    <p class="mt-2 text-white/90 text-sm font-medium">Inicia el trámite o solicita más información aquí.</p>
                                    <button class="mt-4 bg-white text-[var(--color-primary)] px-6 py-2 rounded-full font-bold hover:bg-gray-100 transition shadow-md">Comenzar</button>
                                   </div>`
                            }
                        </div>
                    </aside>
                 </div>
            </article>
        `;
        
        const pageContainer = document.getElementById(`${category}-page`);
        const detailContainer = document.getElementById(`${category}-service-detail`);
        
        if (pageContainer && detailContainer) {
            pageContainer.querySelector('.service-filters')?.classList.add('hidden'); // Ocultar filtros
            pageContainer.querySelector(`#${category}-service-list`)?.classList.add('hidden');
            
            detailContainer.innerHTML = detailHTML;
            detailContainer.classList.remove('hidden');

            detailContainer.querySelector('.back-to-list-btn').addEventListener('click', (e) => {
                const cat = (e.currentTarget as HTMLElement).dataset.category;
                showPage(cat); 
            });
        }
    }

    const featuredServices = {
        'adultos-mayores-card': {
            title: "ADULTOS MAYORES",
            description: "Programas de apoyo y bienestar",
            services: [
                { title: "Gimnasia en terreno.", category: "personas" },
                { title: "Apoyo de pañales adulto", category: "personas" }
            ]
        },
        'mujer-card': {
            title: "MUJER",
            description: "Equidad y emprendimiento",
            services: [
                { title: "Ferias de servicios (Sección de la Mujer)", category: "personas" },
                { title: "Asistencia Social (Mujer)", category: "personas" }
            ]
        },
        'infancia-card': {
            title: "INFANCIA",
            description: "Futuro y oportunidades",
            services: [
                { title: "Entrega de Libros a niños y niñas desde los 3 meses a los 12 años", category: "cultura" }, 
                { title: "Becas Escolares (PAE/PUE/TIC)", category: "personas" }
            ]
        },
        'inclusion-card': {
            title: "INCLUSIÓN",
            description: "Una comuna para todos",
            services: [
                { title: "Taller Estimulación Cognitiva I y II", category: "personas" },
                { title: "Asesoría jurídica (Inclusión y No Discriminación)", category: "personas" }
            ]
        }
    };

    const bottomCardsContainer = document.getElementById('bottom-cards-container');

    function populateBottomCards() {
        for (const cardId in featuredServices) {
            const cardElement = document.getElementById(cardId);
            const data = featuredServices[cardId];
            if (cardElement) {
                let servicesHTML = data.services
                    .map(serviceRef => {
                        const exists = servicesData[serviceRef.category]?.some(s => s.title === serviceRef.title);
                        if (!exists) return ''; 
                        
                        return `<li><a href="#" class="bottom-service-link text-[var(--color-primary)] hover:underline flex items-center gap-2 font-bold" data-service-title="${serviceRef.title}" data-category="${serviceRef.category}"><i class="fas fa-chevron-right text-xs text-gray-400 dark:text-white"></i> ${serviceRef.title}</a></li>`;
                    })
                    .join('');

                cardElement.innerHTML = `
                    <h3>${data.title}</h3>
                    <p class="mb-4 text-sm text-gray-900 dark:text-white font-medium">${data.description}</p>
                    <ul class="space-y-2 text-sm">${servicesHTML}</ul>
                `;
            }
        }
    }
    
    bottomCardsContainer?.addEventListener('click', e => {
        const target = (e.target as HTMLElement).closest('.bottom-service-link');
        if (target) {
            e.preventDefault();
            const serviceTitle = (target as HTMLElement).dataset.serviceTitle;
            const serviceCategory = (target as HTMLElement).dataset.category;
            
            showPage(serviceCategory);
            
            setTimeout(() => {
                if (serviceTitle && serviceCategory) {
                    renderServiceDetail(serviceTitle, serviceCategory);
                }
            }, 0);
        }
    });

    (window as any).showPage = showPage;
    showPage('home');
    populateBottomCards();
});