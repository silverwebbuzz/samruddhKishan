//@ts-nocheck
import { Icon } from '@iconify/react'
import Link from 'next/link'

export default function Topbar({ data }) {
  return (
    <div class='top_bar'>
      <div class='top_bar_left'>
        <p>Health for the Public, Wealth for the Farmers!</p>
        <ul>
          <li>
            <Icon icon='ion:location-outline' /> {data?.adminAddress}
          </li>
          <li>
            <Icon icon='iconoir:phone' /> {data?.adminPhone}
          </li>
        </ul>
      </div>
      <div class='top_bar_right'>
        <div class='top_bar_right_social social'>
          <ul>
            <li>
              <a href={data?.facebook || '#'}>
                <Icon icon='ri:facebook-fill' />
              </a>
            </li>
            <li>
              <a href={data?.twitter}>
                <Icon icon='mdi:twitter' />
              </a>
            </li>
            <li>
              <a href={data?.instagram}>
                <Icon icon='mdi:youtube' />
              </a>
            </li>
            <li>
              <a href={data?.linkedin}>
                <Icon icon='ri:linkedin-fill' />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
