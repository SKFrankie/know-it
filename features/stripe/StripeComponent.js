import React, {useEffect, useState} from 'react'
import {getCustomer} from '../../helpers/stripe';

import { useRouter } from 'next/router';
const StripeComponent = () => {
  const router = useRouter();
  const { status, session_id } = router.query;
  const [customer, setCustomer] = useState(null);

  useEffect(() => {
    if (status === 'success') {
      getCustomer(setCustomer, session_id);
    }
  }, [session_id])
  return (
    <div>
      {status && status === "success" && customer && <p>sucesssss</p>}
      {status && status === "cancel" && <p>Payment unsucessful</p>}
      
    </div>
  )
}

export default StripeComponent
