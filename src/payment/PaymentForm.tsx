import { CardElement, CardNumberElement, CardExpiryElement, CardCvcElement, useElements, useStripe } from "@stripe/react-stripe-js"
import axios from "axios"
import { API_URL } from '../common/constants';
import React, { useState } from 'react'
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
  PasswordInput,
} from '@mantine/core';

export default function PaymentForm() {
    const [success, setSuccess ] = useState(false)
    const stripe = useStripe()
    const elements = useElements()


    const handleSubmit = async (e: any) => {
        e.preventDefault()
		if (stripe === null) {
			throw new Error(`BUG: stripe is null`)
		}
		
		if (elements === null) {
			throw new Error(`BUG: stripe elements is null`)
		}
		const element = elements.getElement(CardElement)
		if (element === null) {
			throw new Error(`BUG: stripe elements element is null`)
		}
        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: "card",
            card: element
        })


    if(!error) {
        try {
            const {id} = paymentMethod
            const response = await axios.post(`${API_URL}/payments`, {
                amount: 1000,
                id
            })

            if(response.data.success) {
                console.log("Apmokėjimas pavyko")
                setSuccess(true)
            }

        } catch (error) {
            console.log("Error", error)
        }
    } else {
        console.log(error.message)
    }
}

    return (
        <Container style={{ marginTop: '100px' }}>
		<Card shadow="xl" p="md" sx={{ maxWidth: 400 }} mx="auto" withBorder>
        {!success ? 
        <form className="form">
			<Title order={1}>Apmokėjimas</Title>
			<Space h="md" />
            <fieldset className="FormGroup">
                <div className="FormRow">
                    <CardElement options={{ hidePostalCode: true }}/>
                </div>
            </fieldset>
			<Space h="md" />
            <Button
              variant="outline"
              color="lime"
              radius="xl"
              size="md"
              style={{ marginTop: 20 }}
              onClick={handleSubmit}
            >
			Mokėti
			</Button>
        </form>
        :
       <div>
           <Title order={1}>Sumokėta</Title>
       </div> 
        }
          </Card>  
        </Container>
    )
}