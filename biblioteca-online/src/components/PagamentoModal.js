import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  TextField,
  Button,
  Typography,
  Box,
  Divider,
  Alert,
  Slide,
} from '@mui/material';

// Animación para la transición del modal
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function PagamentoModal({ open, onClose, emprestimo, finalizarPagamento }) {
  const [paymentMethod, setPaymentMethod] = useState('');
  const [amountGiven, setAmountGiven] = useState('');
  const [change, setChange] = useState(0);
  const [step, setStep] = useState(1);
  const [error, setError] = useState('');
  const [price, setPrice] = useState(emprestimo ? parseFloat(emprestimo.price) : 0);
  const [fineApplied, setFineApplied] = useState(emprestimo ? emprestimo.fineApplied : false);

  useEffect(() => {
    if (open) {
      // Resetear estados al abrir el modal
      setPaymentMethod('');
      setAmountGiven('');
      setChange(0);
      setStep(1);
      setError('');
      setPrice(emprestimo ? parseFloat(emprestimo.price) : 0);
      setFineApplied(emprestimo ? emprestimo.fineApplied : false);

      if (emprestimo && emprestimo.tipo === 'rental' && !emprestimo.fineApplied) {
        const dataDevolucao = new Date(emprestimo.dataDevolucao);
        const dataActual = new Date();

        if (dataActual > dataDevolucao) {
          const multa = parseFloat((emprestimo.price * 0.10).toFixed(2)); // 5% de multa
          const nuevoPrecio = parseFloat((emprestimo.price + multa).toFixed(2));
          setPrice(nuevoPrecio);
          setFineApplied(true);
        }
      }
    }
  }, [emprestimo, open]);

  const handlePaymentMethodSelect = (e) => {
    setPaymentMethod(e.target.value);
    if (e.target.value === 'card' || e.target.value === 'pix') {
      setStep(3);
    } else {
      setStep(2);
    }
  };

  const handleAmountGiven = (e) => {
    setAmountGiven(e.target.value);
  };

  const handleProcessPayment = () => {
    const amount = parseFloat(amountGiven);
    const totalPrice = price;

    if (isNaN(amount)) {
      setError('Por favor, ingrese un valor válido.');
      return;
    }

    if (amount < totalPrice) {
      setError('El valor entregado es menor que el total a pagar.');
      return;
    }

    const changeAmount = parseFloat((amount - totalPrice).toFixed(2));
    setChange(changeAmount);
    setError('');
    setStep(3);
  };

  const handleFinish = () => {
    const dataDevolucaoUsuario = new Date().toISOString().split('T')[0];
    let updatedEmprestimo = {
      ...emprestimo,
      devuelto: paymentMethod === 'pix' ? true : emprestimo.devuelto, // Considera pago PIX como devuelto automáticamente
      dataDevolucaoUsuario: paymentMethod === 'pix' ? dataDevolucaoUsuario : emprestimo.dataDevolucaoUsuario,
      paymentMethod: paymentMethod,
      price: price,
      fineApplied: fineApplied, // Asegurar que la multa aplicada se guarde
    };
    finalizarPagamento(updatedEmprestimo);
    onClose();
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <FormControl component="fieldset">
            <FormLabel component="legend">Método de Pago</FormLabel>
            <RadioGroup
              name="paymentMethod"
              value={paymentMethod}
              onChange={handlePaymentMethodSelect}
            >
              <FormControlLabel value="cash" control={<Radio />} label="Efectivo" />
              <FormControlLabel value="card" control={<Radio />} label="Tarjeta" />
              <FormControlLabel value="pix" control={<Radio />} label="PIX" />
            </RadioGroup>
          </FormControl>
        );
      case 2:
        return (
          <Box mt={2}>
            <Typography variant="h6" gutterBottom>
              Total a Pagar: <strong>${price.toFixed(2)}</strong>
            </Typography>
            <TextField
              label="Cantidad Entregada"
              type="number"
              value={amountGiven}
              onChange={handleAmountGiven}
              fullWidth
              margin="normal"
              inputProps={{ min: "0", step: "0.01" }}
            />
            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}
            <Box display="flex" justifyContent="flex-end">
              <Button variant="contained" color="primary" onClick={handleProcessPayment}>
                Procesar Pago
              </Button>
            </Box>
          </Box>
        );
      case 3:
        return (
          <Box mt={2}>
            <Alert severity="success" sx={{ mb: 2 }}>
              ¡Pago realizado con éxito!
            </Alert>
            <Typography variant="subtitle1" gutterBottom>
              <strong>Método de Pago:</strong>{' '}
              {paymentMethod === 'cash'
                ? 'Efectivo'
                : paymentMethod === 'card'
                ? 'Tarjeta'
                : 'PIX'}
            </Typography>
            {paymentMethod === 'cash' && (
              <>
                <Typography variant="subtitle1" gutterBottom>
                  <strong>Cantidad Pagada:</strong> ${parseFloat(amountGiven).toFixed(2)}
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                  <strong>Vuelto:</strong> ${change.toFixed(2)}
                </Typography>
              </>
            )}
            {paymentMethod === 'pix' && (
              <Typography variant="subtitle1" gutterBottom>
                El pago vía PIX se ha procesado correctamente.
              </Typography>
            )}
            <Divider sx={{ my: 2 }} />
            <Box display="flex" justifyContent="flex-end">
              <Button variant="contained" color="primary" onClick={handleFinish}>
                Finalizar
              </Button>
            </Box>
          </Box>
        );
      default:
        return null;
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      TransitionComponent={Transition}
      fullWidth
      maxWidth="sm"
      aria-labelledby="pagamento-modal-title"
    >
      <DialogTitle id="pagamento-modal-title">Procesar Pago</DialogTitle>
      <DialogContent dividers>{renderStepContent()}</DialogContent>
    </Dialog>
  );
}

export default PagamentoModal;
