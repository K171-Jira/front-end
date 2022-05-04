import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import React from "react"
import PaymentForm from "./PaymentForm"

const PUBLIC_KEY = "pk_test_51KvX84HhfecGb7CTeLV4WVfi0Pq8CJFL7WL4YCgCOPBMvRGElJs2PVH4zgWUBGR281TnzHNpXMDgJYRxtLNNgxgx00UjPtmgjw"

const stripeTestPromise = loadStripe(PUBLIC_KEY)

export default function StripeContainer() {
	return (
		<Elements stripe={stripeTestPromise}>
			<PaymentForm />
		</Elements>
	)
}