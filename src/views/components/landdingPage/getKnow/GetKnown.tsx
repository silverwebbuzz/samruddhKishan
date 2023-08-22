import React, { SyntheticEvent, useState } from 'react'
import { Box, Grid } from '@mui/material'
import CountUp from 'react-countup'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import VisibilitySensor from 'react-visibility-sensor'
import Icon from 'src/@core/components/icon'
const GetToKnow = () => {
  const [expanded, setExpanded] = useState<string | false>(false)
  const [viewPortEntered, setViewPortEntered] = useState(false)
  const handleChange = (panel: string) => (event: SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false)
  }
  return (
    <>
      <section className='get-to-know sec_padding'>
        <Grid container style={{ alignItems: 'center' }}>
          <Grid sm={12} md={5} style={{ position: 'relative' }}>
            <Box className='get-to-know-left'>
              <img className='get-to-know-img' src='/images/logo/1-1.jpg' alt='slider6' />
              <img className='get-to-know-img2' src='/images/logo/22.png' alt='slider6' />
            </Box>
            <Box className='get_to_know_btm'>
              <div className='get_to_know_btm_left'>
                <img src='/images/logo/1-2.png' alt='d' />
              </div>
              <div className='get_to_know_btm_right'>
                <div className='timer'>
                  <CountUp end={259} duration={2} suffix='K'>
                    {({ countUpRef, start }) => (
                      <VisibilitySensor active={!viewPortEntered} onChange={start} delayedCall>
                        <span ref={countUpRef} />
                      </VisibilitySensor>
                    )}
                  </CountUp>
                </div>
                <p>Agriculture, Organic Products</p>
              </div>
            </Box>
          </Grid>
          <Grid sm={12} md={7}>
            <Box className='get-to-know-right'>
              <p className='get-to-know-heading'>GET TO KNOW US</p>
              <h1 className='get-to-know-content'>
                Agriculture matters to <br />
                the future of development
              </h1>
              <div>
                <Accordion
                  className='accordion-main'
                  expanded={expanded === 'panel1'}
                  onChange={handleChange('panel1')}
                >
                  <AccordionSummary
                    id='controlled-panel-header-1'
                    aria-controls='controlled-panel-content-1'
                    expandIcon={<Icon fontSize='1.25rem' icon='tabler:chevron-down' />}
                  >
                    <h4 className='get-col-heading'>Accordion 1</h4>
                  </AccordionSummary>
                  <AccordionDetails>
                    <p className='get-col-text'>
                      Wafer sesame snaps chocolate bar candy canes halvah. Cupcake sesame snaps sweet tart dessert
                      biscuit. Topping soufflé tart sweet croissant.
                    </p>
                  </AccordionDetails>
                </Accordion>

                <Accordion
                  className='accordion-main'
                  expanded={expanded === 'panel2'}
                  onChange={handleChange('panel2')}
                >
                  <AccordionSummary
                    id='controlled-panel-header-2'
                    aria-controls='controlled-panel-content-2'
                    expandIcon={<Icon fontSize='1.25rem' icon='tabler:chevron-down' />}
                  >
                    <h4 className='get-col-heading'>Accordion 1</h4>
                  </AccordionSummary>
                  <AccordionDetails>
                    <p className='get-col-text'>
                      Wafer sesame snaps chocolate bar candy canes halvah. Cupcake sesame snaps sweet tart dessert
                      biscuit. Topping soufflé tart sweet croissant.
                    </p>
                  </AccordionDetails>
                </Accordion>

                <Accordion
                  className='accordion-main'
                  expanded={expanded === 'panel3'}
                  onChange={handleChange('panel3')}
                >
                  <AccordionSummary
                    id='controlled-panel-header-3'
                    aria-controls='controlled-panel-content-3'
                    expandIcon={<Icon fontSize='1.25rem' icon='tabler:chevron-down' />}
                  >
                    <h4 className='get-col-heading'>Accordion 1</h4>
                  </AccordionSummary>
                  <AccordionDetails>
                    <p className='get-col-text'>
                      Wafer sesame snaps chocolate bar candy canes halvah. Cupcake sesame snaps sweet tart dessert
                      biscuit. Topping soufflé tart sweet croissant.
                    </p>
                  </AccordionDetails>
                </Accordion>
              </div>
            </Box>
          </Grid>
        </Grid>
      </section>
    </>
  )
}

export default GetToKnow
