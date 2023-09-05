// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import { useTheme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

// ** Icons Imports
import Icon from 'src/@core/components/icon'

// ** Third Party Imports
import { ApexOptions } from 'apexcharts'

// ** Custom Components Imports
import ReactApexcharts from 'src/@core/components/react-apexcharts'
import CustomAvatar from 'src/@core/components/mui/avatar'
// ** Util Import
import { hexToRGBA } from 'src/@core/utils/hex-to-rgba'
import { Avatar, AvatarGroup } from '@mui/material'
import { textTransform } from '@mui/system'

const series = [32, 41, 41, 70]

const RoleCard = ({ data, roleName }: any) => {
  // ** Hook
  const theme = useTheme()

  const options: ApexOptions = {
    colors: [
      theme.palette.success.main,
      hexToRGBA(theme.palette.success.main, 0.7),
      hexToRGBA(theme.palette.success.main, 0.5),
      hexToRGBA(theme.palette.success.main, 0.16)
    ],
    stroke: { width: 0 },
    legend: { show: false },
    tooltip: { enabled: false },
    dataLabels: { enabled: false },
    labels: ['Electronic', 'Sports', 'Decor', 'Fashion'],
    states: {
      hover: {
        filter: { type: 'none' }
      },
      active: {
        filter: { type: 'none' }
      }
    },
    grid: {
      padding: {
        top: -22,
        bottom: -18
      }
    },
    plotOptions: {
      pie: {
        customScale: 0.8,
        expandOnClick: false,
        donut: {
          size: '73%',
          labels: {
            show: true,
            name: {
              offsetY: 22,
              color: theme.palette.text.secondary,
              fontFamily: theme.typography.fontFamily
            },
            value: {
              offsetY: -17,
              fontWeight: 500,
              fontSize: '1.75rem',
              formatter: val => `${val}`,
              color: theme.palette.text.primary,
              fontFamily: theme.typography.fontFamily
            },
            total: {
              show: true,
              label: 'Total',
              fontSize: '1.1rem',
              color: theme.palette.text.secondary,
              fontFamily: theme.typography.fontFamily
            }
          }
        }
      }
    },
    responsive: [
      {
        breakpoint: theme.breakpoints.values.lg,
        options: {
          chart: { width: 200, height: 256 }
        }
      },
      {
        breakpoint: theme.breakpoints.values.md,
        options: {
          chart: { width: 150, height: 200 }
        }
      }
    ]
  }

  return (
    <Card>
      <CardContent>
        <Box sx={{ gap: 2, display: 'flex', alignItems: 'stretch', justifyContent: 'space-between' }}>
          <Box sx={{ gap: 2, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <Typography variant='h4' sx={{ fontSize: { xs: 20, md: 21 }, mb: 0.5 }}>
                {data?.roleType}
              </Typography>
              <Typography variant='body1' sx={{ color: '#898989', textTransform: 'capitalize' }}>
                Number of {data?.roleType?.toLowerCase()}
              </Typography>
              <Typography color={'primary'} variant='h4' sx={{ mb: 0.5, fontWeight: '700' }}>
                {data?.count}
              </Typography>
            </div>
          </Box>
          <Box sx={{ mb: 1.5, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <AvatarGroup
                max={4}
                className='pull-up'
                sx={{
                  '& .MuiAvatar-root': {
                    width: 30,
                    height: 30,
                    fontSize: '0.875rem',
                    '@media (max-width:700px)': {
                      width: 28, // Adjust the width for xs screen size
                      height: 28 // Adjust the height for xs screen size
                    }
                  }
                }}
              >
                <Avatar src={`/images/avatars/1.png`} />
                <Avatar src={`/images/avatars/2.png`} />
                <Avatar src={`/images/avatars/3.png`} />
                <Avatar src={`/images/avatars/4.png`} />
                <Avatar src={` /images/avatars/5.png`} />
                <Avatar src={`/images/avatars/4.png`} />
                <Avatar src={` /images/avatars/5.png`} />
                <Avatar src={`/images/avatars/4.png`} />
                <Avatar src={` /images/avatars/5.png`} />
              </AvatarGroup>
            </div>
          </Box>
          {/* <Typography color={'primary'} variant='h4' sx={{ mb: 0.5, fontWeight: '900' }}>
            {data?.count}
          </Typography> */}
        </Box>
      </CardContent>
    </Card>
  )
}

export default RoleCard
