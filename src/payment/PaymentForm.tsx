import {
  CardElement,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import axios from 'axios';
import { API_URL } from '../common/constants';
import React, { useContext, useState } from 'react';
import {
  TextInput,
  Button,
  Title,
  Space,
  Text,
  Anchor,
  Alert,
  Card,
  Loader,
  Center,
  Container,
  NumberInput,
} from '@mantine/core';

import User from '../users/models/User';
import { AuthContext } from '../authentication/context/AuthContext';
import { UserContextType } from '../authentication/models/User';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { getValue } from '@testing-library/user-event/dist/utils';

export default function PaymentForm() {
  const navigate = useNavigate();
  const [amount, setValue] = useState(5);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState('');
  const { user, addBalance } = useContext(AuthContext) as UserContextType;
  const stripe = useStripe();
  const elements = useElements();
  
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
	  var selectedAmount = amount;
    Math.trunc(selectedAmount);
    if (stripe === null) {
      throw new Error(`BUG: stripe is null`);
    }
    if (elements === null) {
      throw new Error(`BUG: stripe elements is null`);
    }
    const element = elements.getElement(CardElement);
    if (element === null) {
      throw new Error(`BUG: stripe elements element is null`);
    }
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: element,
    });
    
    if (!error) {
      try {
        const { id } = paymentMethod;
        const _id = user?._id;
        const balance = user?.balance;
        const response = await axios.post(`${API_URL}/payments`, {
		       id,
          _id,
          balance,
		      selectedAmount,
        });
        if (response.data.success) {
          console.log('Apmokėjimas pavyko');
          addBalance(amount);
          setSuccess(true);
        } else {
          console.log('Error', response.data);
        }
      } catch (error) {
        console.log('Error', error);
      }
    } else {
      console.log(error.message);
      setText(String(error.message));
    }
    setLoading(false)
  };

  return (
    <Container style={{ marginTop: '100px' }}>
      <Card shadow="xl" p="md" sx={{ maxWidth: 400 }} mx="auto" withBorder>
      
        {!success ? (
          
          <form className="form">
            <Title order={1}>Apmokėjimas</Title>
            <NumberInput
            style={{ marginTop: 15 }}
            label="Pasirinkite taškų kiekį"
            description="Vieno taško vertė - 1 euras"
            stepHoldDelay={500}
            stepHoldInterval={100}
            max={25}
            min={5}
            value= {amount}
            onChange={(value) => setValue(Number(value))}
            />
            <Space h="md" />
            <fieldset className="FormGroup">
              <div className="FormRow">
                <CardElement options={{ hidePostalCode: true }} />
              </div>
            </fieldset>
            <Space h="md" />
            <Text color="red">{text}  </Text>
            {loading? (<Loader color="lime" size="md" variant="bars" />):
            (
            <Button
              variant="outline"
              color="lime"
              radius="xl"
              size="md"
              style={{ marginTop: 20 }}
              onClick={handleSubmit}
            >
              Mokėti
            </Button>)}
          </form>
        ) : (
          <div>
            <Title order={1}>Sumokėta</Title>
           
          </div>
        )}
      </Card>
    </Container>
  );
}
