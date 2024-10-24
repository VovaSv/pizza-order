import { useNavigate } from 'react-router-dom'
import Button from '../../components/Button/Button'
import styles from './OrderSubmitted.module.css'

export function OrderSubmitted() {
    const navigate = useNavigate();
    return (

        <div className={styles['container']}>
            <img src="/pizza.svg" alt="" />
            <div className={styles['text']}>Your order was successfully submitted</div>
            <Button appearance='big' onClick={() => navigate('/')}>Create new order</Button>
        </div>
    )

}