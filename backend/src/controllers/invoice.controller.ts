import { Request, Response } from 'express'
import { Invoice } from '../models/invoice.model'

export async function createInvoice(req: Request, res: Response) {
  const { total_time, hourly_rate, project_uuid } = req.body;
  if (!total_time || !hourly_rate || !project_uuid) {
    return res.status(400).json({ message: 'Faltan datos para la creación de facturas' });
  }
  try {
    const project = await Invoice.findByPk(project_uuid);
    if (!project) {
      return res.status(400).json({ message: 'UUID de proyecto no válido' });
    }
    const newinvoice = await Invoice.create({ total_time, hourly_rate, project_uuid });
    return res.status(201).json({ message: 'Factura creada correctamente', newinvoice });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Se ha producido un error desconocido' });
  }
}
export async function getAllInvoices(_req: Request, res: Response) {
  try {
    const getInvoices = await Invoice.findAll();
    if (!getInvoices) {
      throw new Error('No se pudieron traer todas las facturas');
    }
    return res.status(200).json({
      message: 'Traes todas las facturas correctamente',
      data: getInvoices,
    });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ message: error.message });
    }
    return res.status(400).json({ message: 'Ocurrio un error desconocido' })
  }
  }

export async function getInvoiceById(req: Request, res: Response) {
  try {
    const invoice = await Invoice.findByPk(req.params.id);
    if (!invoice) return res.status(404).json({ message: 'Factura no encontrada' });
    res.status(200).json({ message: 'Factura encontrada', data: invoice });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Ocurrio un error desconocido' });
    }
  }
}
export async function updateInvoice(req: Request, res: Response) {
  try {
    const invoice = await Invoice.findByPk(req.params.uuid)
    if (!invoice) return res.status(401).json({ message: 'error al traer la factura, factura no valida' })
    const updateInvoice = await invoice.update(req.body)
    return res.status(201).json({ message: 'las factura ha sido actualizadas correctamente', updateInvoice })
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ message: error.message })
    } else {
      return res.status(400).json({ message: 'Ocurrio un error desconocido' })
    }
  }
}
export async function deleteInvoice(req: Request, res: Response) {
  try {
    const invoice = await Invoice.findByPk(req.params.uuid);
    if (!invoice) return res.status(401).json({ message: 'error al traer la factura, factura no valida' })    
    const deleteinvoice = await invoice.destroy(req.body)
    return res.status(200).json({message: 'La factura fue eliminada correctamente', deleteinvoice});
} catch (error) {
  if (error instanceof Error) {
    return res.status(400).json({ message: error.message });
  } else {
    return res.status(400).json({ message: 'Ocurrio un error desconocido' });
  }
}
}
