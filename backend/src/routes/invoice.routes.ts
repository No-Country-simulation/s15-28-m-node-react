import express from 'express';
import {
  createInvoice,
  getAllInvoices,
  getInvoiceById,
  updateInvoice,
  deleteInvoice
} from '../controllers/invoice.controller'


const router = express.Router();

router.post('/invoices', createInvoice);
router.get('/getallinvoices', getAllInvoices);
router.get('/invoiceid/:id', getInvoiceById);
router.patch('/invoice/update/:id', updateInvoice);
router.delete('/invoices/delete/:id', deleteInvoice);

export default router;
