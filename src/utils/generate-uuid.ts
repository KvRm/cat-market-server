const hexTable: string[] = []

for (let i = 0; i < 256; i++) {
  hexTable[i] = (i < 16 ? '0' : '') + i.toString(16)
}

export function generateUuid() {
  const d0 = (Math.random() * 0xFFFFFFFF) | 0
  const d1 = (Math.random() * 0xFFFFFFFF) | 0
  const d2 = (Math.random() * 0xFFFFFFFF) | 0
  const d3 = (Math.random() * 0xFFFFFFFF) | 0

  return (
    `${hexTable[d0 & 0xFF]!
    + hexTable[(d0 >> 8) & 0xFF]
    + hexTable[(d0 >> 16) & 0xFF]
    + hexTable[(d0 >> 24) & 0xFF]
    }-${
      hexTable[d1 & 0xFF]
    }${hexTable[(d1 >> 8) & 0xFF]
    }-${
      hexTable[((d1 >> 16) & 0x0F) | 0x40]
    }${hexTable[(d1 >> 24) & 0xFF]
    }-${
      hexTable[(d2 & 0x3F) | 0x80]
    }${hexTable[(d2 >> 8) & 0xFF]
    }-${
      hexTable[(d2 >> 16) & 0xFF]
    }${hexTable[(d2 >> 24) & 0xFF]
    }${hexTable[d3 & 0xFF]
    }${hexTable[(d3 >> 8) & 0xFF]
    }${hexTable[(d3 >> 16) & 0xFF]
    }${hexTable[(d3 >> 24) & 0xFF]}`
  )
}
