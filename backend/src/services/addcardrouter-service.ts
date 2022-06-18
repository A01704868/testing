import { PrismaClient } from '@prisma/client';
import { CartaRuta } from '@prisma/client';

const prisma = new PrismaClient();

export async function postCarts(cartaRuta: CartaRuta): Promise<CartaRuta> {
    console.log('EX: ',cartaRuta);
    const{
        
        nombre,
        descripcion,
        parqueId,
    } = cartaRuta;

const newCarta: CartaRuta = 
await prisma.cartaRuta.create({

    data: {
        nombre: cartaRuta.nombre,
        descripcion: cartaRuta.descripcion,
        parque: {
            connect: {
                id: +cartaRuta.parqueId,
            }
        },
    },

});

return newCarta;
    
}

export default{
    postCarts
} as const;