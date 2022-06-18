import { PrismaClient } from '@prisma/client';
import { CartaRuta } from '@prisma/client';

const prisma = new PrismaClient();

export async function editCarts(cartaruta: CartaRuta): Promise<CartaRuta> {

const updatedCarta: CartaRuta = 
await prisma.cartaRuta.update({

    data: {
        nombre: cartaruta.nombre,
        descripcion: cartaruta.descripcion,
        parqueId: cartaruta.parqueId,
    },

    where:{
        id: cartaruta.id,
    }

});

return updatedCarta;
    
}

export default{
    editCarts
} as const;