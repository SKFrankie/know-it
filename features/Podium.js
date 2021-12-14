import React from 'react'
import { motion } from 'framer-motion'

const Podium =() => {
  const podium = [{position: 1, color: "#00AEE5"}, {position:0, color: "#01B84A"}, {position: 2, color: "#D90A0A"}]
  return (
    <div
      style={{
        alignContent: 'flex-end',
        alignItems: 'flex-end',
        borderBottom: '1px solid #e5e7eb',
        display: 'grid',
        gap: '.5rem',
        gridAutoFlow: 'column dense',
        justifyContent: 'center',
        justifyItems: 'center',
        height: 250,
        marginTop: '2rem',
      }}
    >
      {podium.map((step) => (
        <PodiumStep key={step.position} podium={podium} step={step} />
      ))}
    </div>
  )
}

const PodiumStep = ({ podium, step }) => {
  const offset = podium.length - step.position
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        placeContent: "center",
      }}
    >
      <motion.div
        style={{
          alignSelf: "center",
          marginBottom: ".25rem",
        }}
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              delay: 1 + (offset + 2),
              duration: 0.75,
            },
          },
        }}
      >
        {/* <img
          src={`https://i.pravatar.cc/64?u=${winner.id}`}
          alt=""
          style={{
            borderRadius: 9999,
            height: '2.75rem',
            overflow: 'hidden',
            width: '2.75rem',
          }}
        /> */}
      </motion.div>
      <motion.div
        style={{
          backgroundColor: step.color,
          borderTopLeftRadius: ".5rem",
          borderTopRightRadius: ".5rem",
          display: "flex",
          marginBottom: -1,
          placeContent: "center",
          width: "4rem",
          boxShadow: "inset 0px 6.59885px 6.59885px rgba(0, 0, 0, 0.25)",
          borderRadius: "7.25209px 7.25209px 0px 0px",
        }}
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { height: 0, opacity: 0 },
          visible: {
            height: 100 * (offset / podium.length),
            opacity: 1,
            transition: {
              delay: 1,
              duration: 2,
              ease: "backInOut",
            },
          },
        }}
      >
        <span style={{ alignSelf: "flex-end", color: "white" }}>
          {step.position + 1}
        </span>
      </motion.div>
    </div>
  );
}
export default Podium
