import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();
async function main() {
     const parqueSeeder = db.parque.createMany({
         data: [
             { nombre: "Alto Golfo de California y Delta del Río Colorado", descripcion: "alguna informacion basica", imagen: "https://tudu.com.mx/wp-content/uploads/2020/10/lugar-2515-1.jpg", direccion: "P.º de los Héroes 96, Zona Urbana Rio Tijuana, 22010 Tijuana, B.C." , latitud: 31.737222222222, longitud: -114.5425, fechaDecreto: "1993/06/10", superficieMarina: 527608.70441, superficieTerrestre: 407147.54559, clicks: 20 },
             { nombre: "Arrecife Alacranes",  descripcion: "alguna informacion basica", imagen: "https://yucatan.travel/wp-content/uploads/2020/03/Arrecife_Alacranes.jpg", direccion: "acceso exclusivamente por via maritima",  latitud: 22.474538, longitud: -89.69506, fechaDecreto: "1994/06/06", superficieMarina: 333715.503244, superficieTerrestre: 53.001756, clicks: 15 },
             { nombre: "Arrecife de Puerto Morelos", descripcion: "alguna informacion basica", imagen: "https://www.mayakaanresidences.com/wp-content/uploads/2021/12/Parque-nacional-arrecife-de-Puerto-Morelos.jpg", direccion: "Plus Code: W53F+QXH Caracol, Quintana Roo",  latitud: 20.90444444, longitud: -86.825, fechaDecreto: "1998/02/02", superficieMarina: 9028.887456, superficieTerrestre: 37.743644, clicks: 30 },
             { nombre: "Arrecifes de Cozumel", descripcion: "alguna informacion basica", imagen: "https://aquaworld.com.mx/wp-content/uploads/2021/04/protege-arrecifes-de-coral_1100x619.jpeg", direccion: "Avenida 4 356, Centro, 77600 San Miguel de Cozumel, Q.R.",  latitud: 20.29361111, longitud: -87.02472222, fechaDecreto: "1996/07/19", superficieMarina: 11905.596084, superficieTerrestre: 82.278916, clicks: 40 },
             { nombre: "Arrecifes de Sian Ka'an", descripcion: "alguna informacion basica", imagen: "https://planb.mx/wp-content/uploads/2021/05/excursion_bisofera_sian_kaan_tu_experiencia_520190424110451.jpg",  direccion: "Felipe Carrillo Puerto, Quintana Roo",  latitud: 19.851182986831976,  longitud: -87.63879593136728, fechaDecreto: "1998/02/02", superficieMarina: 1361.001633, superficieTerrestre: 33566.156767, clicks: 10 },
             { nombre: "El Cimatario", descripcion: "alguna informacion basica", imagen: "https://www.ciudadypoder.mx/wp-content/uploads/2016/09/7-B_AR-1.jpg",  direccion: "Edo de Mexico 4660, La Ceja, Qro.",  latitud: 20.534849962159694,  longitud: -100.3577293854862, fechaDecreto: "1982/07/21", superficieMarina: 0, superficieTerrestre: 2447.874, clicks: 15 },
         ]
     });

     const categoriaSeeder = db.categoria.createMany({
        data: [
            { nombre: "Reserva de la Biosfera" },
            { nombre: "Parque Nacional" },
            { nombre: "Reserva de la Biosfera" },
            { nombre: "Área de Protección de Flora y Fauna" },
            { nombre: "Monumento Natural" },
            { nombre: "Santuario" },
        ]
    });

    const categoriaParqueSeeder = db.categoriaParque.createMany({
        data: [
            {parqueId: 1, categoriaId: 1, assignedBy: "Seeder"},
            {parqueId: 2, categoriaId: 2, assignedBy: "Seeder"},
            {parqueId: 3, categoriaId: 2, assignedBy: "Seeder"},
            {parqueId: 4, categoriaId: 2, assignedBy: "Seeder"},
            {parqueId: 5, categoriaId: 1, assignedBy: "Seeder"},
            {parqueId: 6, categoriaId: 2, assignedBy: "Seeder"},
        ]
    });


    const estadoSeeder = db.estado.createMany({
        data: [
            { nombre: "Yucatán"},
            { nombre: "Quintana Roo"},
            { nombre: "Baja California Sur"},
            { nombre: "Campeche"},
            { nombre: "Hidalgo"},
            { nombre: "Michoacán"},
            { nombre: "Sonora"},
            { nombre: "Oaxaca"},
            { nombre: "Chiapas"},
            { nombre: "Chihuahua"},
            { nombre: "Tabasco"},
            { nombre: "Nuevo León"},
            { nombre: "Jalisco"},
            { nombre: "Estado de México"},
            { nombre: "Veracruz"},
            { nombre: "Coahuila"},
            { nombre: "Ciudad de México"},
            { nombre: "San Luis Potosí"},
            { nombre: "Guerrero"},
            { nombre: "Nayarit"},
            { nombre: "Durango"},
            { nombre: "Puebla"},
            { nombre: "Tlaxcala"},
            { nombre: "Colima"},
            { nombre: "Baja California"},
            { nombre: "Querétaro"},
        ]
    });

    

    const estadoParqueSeeder = db.estadoParque.createMany({
        data: [
            {parqueId: 1, estadoId: 25, assignedBy: "Seeder"},
            {parqueId: 1, estadoId: 7, assignedBy: "Seeder"},
            {parqueId: 2, estadoId: 1, assignedBy: "Seeder"},
            {parqueId: 3, estadoId: 2, assignedBy: "Seeder"},
            {parqueId: 4, estadoId: 2, assignedBy: "Seeder"},
            {parqueId: 5, estadoId: 2, assignedBy: "Seeder"},
            {parqueId: 6, estadoId: 26, assignedBy: "Seeder"},
        ]
    });

    const regionSeeder = db.region.createMany({
        data: [
            { nombre: "Noroeste y Alto Golfo de California"},
            { nombre: "Península de Yucatán y Caribe Mexicano"},
            { nombre: "Península de Baja California y Pacífico Norte"},
            { nombre: "Centro y Eje Neovolcánico"},
            { nombre: "Occidente y Pacífico Centro"},
            { nombre: "Frontera Sur, Istmo y Pacífico Sur"},
            { nombre: "Norte y Sierra Madre Occidental"},
            { nombre: "Noreste y Sierra Madre Oriental"},
            { nombre: "Planicie Costera y Golfo de México"},
        ]
    });

    const regionParqueSeeder = db.regionParque.createMany({
        data: [
            {parqueId: 1, regionId: 1, assignedBy: "Seeder"},
            {parqueId: 2, regionId: 2, assignedBy: "Seeder"},
            {parqueId: 3, regionId: 2, assignedBy: "Seeder"},
            {parqueId: 4, regionId: 2, assignedBy: "Seeder"},
            {parqueId: 5, regionId: 2, assignedBy: "Seeder"},
            {parqueId: 6, regionId: 4, assignedBy: "Seeder"},
        ]
    });

    const floraSeeder = db.flora.createMany({
        data: [
            { nombre: "Bugambilia", imagen: "https://t1.ev.ltmcdn.com/es/posts/1/3/7/cuidados_de_la_bugambilia_731_600_square.jpg", titulo: "Algo Importante", descripcion: "informacion sobre la planta"},
            { nombre: "Lirio amarillo", imagen: "https://t2.ev.ltmcdn.com/es/posts/1/7/8/cultivo_y_cuidados_del_lirio_amarillo_871_orig.jpg", titulo: "Algo importante", descripcion: "informacion sobre la planta"},
            { nombre: "Hortensia", imagen: "https://i0.wp.com/www.florestore.com/flores-a-domicilio/wp-content/uploads/2018/04/cuidados-de-las-hortensias-florestore-portada.jpg?fit=846%2C635&ssl=1", titulo: "Algo Importante", descripcion: "info de la planta"},
            { nombre: "Margarita", imagen: "https://i0.wp.com/www.florestore.com/flores-a-domicilio/wp-content/uploads/2018/07/cuidados-de-las-margaritas-florestore-portada.jpg?fit=846%2C635&ssl=1", titulo: "Algo Importante", descripcion: "info de la planta"},

        ]
    });

    const floraParqueSeeder = db.floraParque.createMany({
        data: [
            {parqueId: 1, floraId: 1, assignedBy: "Seeder"},
            {parqueId: 1, floraId: 2, assignedBy: "Seeder"},
            {parqueId: 2, floraId: 2, assignedBy: "Seeder"},
            {parqueId: 2, floraId: 1, assignedBy: "Seeder"},
            {parqueId: 3, floraId: 1, assignedBy: "Seeder"},
            {parqueId: 3, floraId: 3, assignedBy: "Seeder"},
            {parqueId: 4, floraId: 3, assignedBy: "Seeder"},
            {parqueId: 4, floraId: 1, assignedBy: "Seeder"},
            {parqueId: 5, floraId: 1, assignedBy: "Seeder"},
            {parqueId: 5, floraId: 2, assignedBy: "Seeder"},
            {parqueId: 6, floraId: 2, assignedBy: "Seeder"},
            {parqueId: 6, floraId: 1, assignedBy: "Seeder"},
        ]
    });

    const faunaSeeder = db.fauna.createMany({
        data: [
            { nombre: "Aguila", imagen: "https://dam.ngenespanol.com/wp-content/uploads/2022/02/a%CC%81guila-calva1.jpg", titulo: "La aguila es patriotica para Mexico", descripcion: "Los ojos de una aguila pueden ver mucho desde el aire."},
            { nombre: "Tarantula", imagen: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Brachypelma_smithi_2009_G03.jpg/1200px-Brachypelma_smithi_2009_G03.jpg", titulo: "Aqui va la informacion mas importante sobre el animal", descripcion: "Aqui va una descripcion con los hechos mas pertinentes de los que quieres informar."},
            { nombre: "Serpiente", imagen: "https://www.nationalgeographic.com.es/medio/2022/02/21/las-serpientes-unos-animales-temidos-y-repudiados-pero-imprescindibles-para-el-mantenimiento-de-los-ecosistemas-pues-entre-otras-cosas-ayudan-a-controlar-las-poblaciones-de-roedores_214d7ffa_800x800.jpg", titulo: "Estas viven en climas aridos o humedos", descripcion: "Tienen dos maneras de cazar. Unas te ahorcan y otras the pican con veneno."},
            { nombre: "Dragon", imagen: "https://media.gq.com.mx/photos/5bf81f5c4958a158fb9a25a3/1:1/w_2142,h_2143,c_limit/targaryen.jpg", titulo: "Estos ni existen" , descripcion: "escupe fuego en las historias de fantasia. Pueden volar con sus alas."},
            { nombre: "Tiburon", imagen: "https://www.nationalgeographic.com.es/medio/2018/02/27/tiburon__1280x720.jpg", titulo: "Los tiburones del area no te hacen daño", descripcion: "Tienen que seguirse moviendo para que puedan respirar"},
            { nombre: "Octopus", imagen: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Octopus_at_Kelly_Tarlton%27s.jpg/1280px-Octopus_at_Kelly_Tarlton%27s.jpg", titulo: "Octopus es un animal que tiene tentaculos", descripcion: "Sus tentaculos se regeneran cuando los cortas"},
            { nombre: "Albatross", imagen: "https://www.doc.govt.nz/thumbs/gallery/globalassets/images/nature/native-animals/birds/albatrosses/royal-albatross-and-chick-1200.jpg", titulo: "Albatrosses are the world's largest seabirds. They spend at least 85% of their lives at sea returning to land (usually remote islands) to breed and raise their young.", descripcion: "Naturally low productivity, combined with changes in climate and habitat conditions and certain fishing practices, make these seabirds highly vulnerable. Until recently scientists recognised 14 different species of albatrosses, but new research using DNA technology has confirmed as many as 24. Thirteen varieties breed in the New Zealand region -> more than anywhere else in the world. Several are extremely rare, like the Antipodean albatross which breed in the sub Antarctic Island of Antipodes. "},
            
        ]
    });

    const faunaParqueSeeder = db.faunaParque.createMany({
        data: [
            {parqueId: 1, faunaID: 1, assignedBy: "Seeder"},
            {parqueId: 1, faunaID: 6, assignedBy: "Seeder"},
            {parqueId: 1, faunaID: 7, assignedBy: "Seeder"},
            {parqueId: 1, faunaID: 4, assignedBy: "Seeder"},
            {parqueId: 2, faunaID: 1, assignedBy: "Seeder"},
            {parqueId: 2, faunaID: 7, assignedBy: "Seeder"},
            {parqueId: 2, faunaID: 3, assignedBy: "Seeder"},
            {parqueId: 3, faunaID: 1, assignedBy: "Seeder"},
            {parqueId: 3, faunaID: 2, assignedBy: "Seeder"},
            {parqueId: 4, faunaID: 5, assignedBy: "Seeder"},
            {parqueId: 4, faunaID: 3, assignedBy: "Seeder"},
            {parqueId: 5, faunaID: 3, assignedBy: "Seeder"},
            {parqueId: 5, faunaID: 4, assignedBy: "Seeder"},
            {parqueId: 6, faunaID: 3, assignedBy: "Seeder"},
            {parqueId: 6, faunaID: 2, assignedBy: "Seeder"},
            {parqueId: 6, faunaID: 1, assignedBy: "Seeder"},
        ]
    });

    const actividadSeeder = db.actividad.createMany({
        data: [
            { nombre: "Senderismo"},
            { nombre: "Ciclismo"},
            { nombre: "Natación"},
            { nombre: "Trotar"},
        ]
    });

    const actividadParqueSeeder = db.actividadParque.createMany({
        data: [
            {parqueId: 1, actividadId: 3, imagen:"https://elcomercio.pe/resizer/B0yJ41HDtd1L3GsfSSZwv27xSuA=/1200x800/smart/filters:format(jpeg):quality(75)/cloudfront-us-east-1.images.arcpublishing.com/elcomercio/FJ6WCG2JNFEJ3OMAFVBW54TSV4.JPG", assignedBy: "Seeder"},
            {parqueId: 2, actividadId: 3, imagen:"https://www.swimtonictech.com/wp-content/uploads/2018/01/nataci%C3%B3n-aguas-abiertas-larga-distancia-1920x1080.jpg", assignedBy: "Seeder"},
            {parqueId: 3, actividadId: 2, imagen:"https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/natacion-aguas-abiertas-1594887282.jpg?crop=1.00xw:0.753xh;0,0.169xh&resize=1200:*", assignedBy: "Seeder"}, 
            {parqueId: 3, actividadId: 1, imagen:"https://planetatriatlon.com/assets/uploads/2016/05/outsidebox.jpg", assignedBy: "Seeder"},
            {parqueId: 6, actividadId: 2, imagen:"https://scontent.fqro3-1.fna.fbcdn.net/v/t1.6435-9/29496190_2058191701124869_4934977398027321344_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=973b4a&_nc_ohc=VrifJUfY2gUAX_mqI13&_nc_ht=scontent.fqro3-1.fna&oh=00_AT8eHqUib6Tv24MG9T4eVHp1_ZumKfCgbcaiPdsn2D9HDQ&oe=62D05517", assignedBy: "Seeder"},
            {parqueId: 6, actividadId: 1, imagen:"https://www.ambientum.com/wp-content/uploads/2020/10/caminata-senderismo.jpg", assignedBy: "Seeder"},
            {parqueId: 6, actividadId: 4, imagen:"https://www.sport.es/labolsadelcorredor/wp-content/uploads/2020/09/jogging-o-trotar-1.jpg", assignedBy: "Seeder"},
        ]
    });

    const anuncioSeeder = db.anuncio.createMany({
        data: [
            { titulo: "Alerta: El parque esta cerrado por lluvias pesadas", descripcion: "Gracias a una tormenta que se aproxima por el mar Pacifico, con designacion Mariana, El parque no se va a abrir por los siguientes 3 dias", variante: "danger", parqueId: 6},
            { titulo: "Advertensia: Temporada de Huracanes empieza en una semana", descripcion: "Resta una semana para visitar el parque hasta que se cierre indefinidamente", variante:"warning", parqueId: 3},
            { titulo: "Annuncio: Inauguración de instalación esta semana", descripcion: "la inauguración de la nueva instalación de alquiler de bicicletas será esta semana. Si quieres ir su inauguracion sera este jueves a las 15:00 horas", variante: "success", parqueId: 2},
            { titulo: "Advertencia: Hay una infestación de chinches", descripcion: "A principios de la temporada se encontraron chinches en la zona sur del parque. Quien sea que visite el sitio por favor tenga en cuenta esta informacion", variante: "warning", parqueId: 6},
        ]
    });

    const horarioSeeder = db.horario.createMany({
        data: [
            { dias: "Ju, Vi, Sa, Do", horaAbrir: "7:00", horaCerrar: "10:00", parqueId: 6 },
            { dias: "Jue, Vie, Sab, Dom", horaAbrir: "13:00", horaCerrar: "16:00", parqueId: 5 },
            { dias: "J, V, S, D", horaAbrir: "11:00", horaCerrar: "14:00", parqueId: 4 },
            { dias: "Lunes a Jueves", horaAbrir: "9:00", horaCerrar: "18:00", parqueId: 3 },
            { dias: "Lunes a Sabado", horaAbrir: "8:00", horaCerrar: "19:00", parqueId: 2 },
            { dias: "Lun, Mar, Mie, Jue, Sab, Dom", horaAbrir: "00:00", horaCerrar: "23:59", parqueId: 1 },
            { dias: "J, V, S, D", horaAbrir: "10:30", horaCerrar: "13:30", parqueId: 6 },
        ]
    });

    
    await parqueSeeder;
    await categoriaSeeder;
    await estadoSeeder;
    await regionSeeder;
    await estadoParqueSeeder;
    await categoriaParqueSeeder;
    await regionParqueSeeder;
    await floraSeeder;
    await floraParqueSeeder;
    await faunaSeeder;
    await faunaParqueSeeder;
    await actividadSeeder;
    await actividadParqueSeeder;
    await anuncioSeeder;
    await horarioSeeder;
    //const users = await db.usuario.findMany();
    //console.log(users);
}

main()
    .then(() => console.log("Executed seeder"))
    .catch((err) => console.error(err))
    .finally(async () =>{
        await db.$disconnect().catch((err) => `Failed to cleanup DB: ${err}`);
    });