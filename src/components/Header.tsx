
import styles from './Header.module.css'
import rocketLogo from '../assets/rocket.svg'
import toDoLogo from '../assets/todo.svg'

export function Header(){
    return ( 
        <div>
            <div className={styles.header}>
                <img className={styles.rocket} src={rocketLogo} alt="" />
                <img src={toDoLogo} alt="" />

            </div>
                           
                    
        </div>
    )
}