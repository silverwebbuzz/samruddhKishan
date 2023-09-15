//@ts-nocheck
import { Icon } from '@iconify/react'

export default function Topbar() {
  return (
    <div class='top_bar'>
      <div class='top_bar_left'>
        <p>That's right, we only sell 100% organic</p>
        <ul>
          <li>
            <Icon icon='ion:location-outline' /> Ahmedabad, India
          </li>
          <li>
            <Icon icon='iconoir:phone' /> +91 85558 41988
          </li>
        </ul>
      </div>
      <div class='top_bar_right'>
        <div class='top_bar_right_social social'>
          <ul>
            <li>
              <a href='#'>
                <Icon icon='ri:facebook-fill' />
              </a>
            </li>
            <li>
              <a href='#'>
                <Icon icon='mdi:twitter' />
              </a>
            </li>
            <li>
              <a href='#'>
                <Icon icon='mdi:youtube' />
              </a>
            </li>
            <li>
              <a href='#'>
                <Icon icon='ri:linkedin-fill' />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
