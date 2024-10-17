'use client'
import styles from './AddRoom.module.css'
import Image from 'next/image'
import plusIcon from '@/imgs/plus-icon.svg'

export const AddRoom = () => {
    return (
        <div className={styles.block}>
            <Image 
                src={plusIcon}
                style={{ fill: 'white'}}
                alt='Plus icon'
                width={30}
                height={30}
                />
            <p>Dodaj pokój</p>
        </div>
    )
}