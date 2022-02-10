import invariant from 'tiny-invariant'
import { ChainId } from '../constants'
import { validateAndParseAddress } from '@jediswap/starknet'
import { Currency, TOKEN0 } from './currency'
import { number } from '@jediswap/starknet'

/**
 * Represents an ERC20 token with a unique address and some metadata.
 */
export class Token extends Currency {
  public readonly chainId: ChainId
  public readonly address: string

  public constructor(chainId: ChainId, address: string, decimals: number, symbol?: string, name?: string) {
    super(decimals, symbol, name)
    this.chainId = chainId
    this.address = validateAndParseAddress(address)
  }

  /**
   * Returns true if the two tokens are equivalent, i.e. have the same chainId and address.
   * @param other other token to compare
   */
  public equals(other: Token): boolean {
    // short circuit on reference equality
    if (this === other) {
      return true
    }
    return this.chainId === other.chainId && this.address === other.address
  }

  /**
   * Returns true if the address of this token sorts before the address of the other token
   * @param other other token to compare
   * @throws if the tokens have the same address
   * @throws if the tokens are on different chains
   */
  public sortsBefore(other: Token): boolean {
    invariant(this.chainId === other.chainId, 'CHAIN_IDS')
    invariant(this.address !== other.address, 'ADDRESSES')
    const thisAddress = number.toBN(this.address)
    const otherAddress = number.toBN(other.address)

    return thisAddress.lt(otherAddress)
  }
}

/**
 * Compares two currencies for equality
 */
export function currencyEquals(currencyA: Currency, currencyB: Currency): boolean {
  if (currencyA instanceof Token && currencyB instanceof Token) {
    return currencyA.equals(currencyB)
  } else if (currencyA instanceof Token) {
    return false
  } else if (currencyB instanceof Token) {
    return false
  } else {
    return currencyA === currencyB
  }
}

export const WTOKEN0 = {
  [ChainId.GÖRLI]: new Token(
    ChainId.GÖRLI,
    '0x51ecf6b7831cd141391313ce417f5f50e2a2cadba553562064bcd0e78eed8d7',
    TOKEN0.decimals,
    TOKEN0.symbol,
    TOKEN0.name
  ),
  [ChainId.MAINNET]: new Token(
    ChainId.MAINNET,
    '0x51ecf6b7831cd141391313ce417f5f50e2a2cadba553562064bcd0e78eed8d7',
    TOKEN0.decimals,
    TOKEN0.symbol,
    TOKEN0.name
  ),
  [ChainId.ROPSTEN]: new Token(
    ChainId.ROPSTEN,
    '0x51ecf6b7831cd141391313ce417f5f50e2a2cadba553562064bcd0e78eed8d7',
    TOKEN0.decimals,
    TOKEN0.symbol,
    TOKEN0.name
  ),
  [ChainId.RINKEBY]: new Token(
    ChainId.RINKEBY,
    '0x51ecf6b7831cd141391313ce417f5f50e2a2cadba553562064bcd0e78eed8d7',
    TOKEN0.decimals,
    TOKEN0.symbol,
    TOKEN0.name
  ),

  [ChainId.KOVAN]: new Token(
    ChainId.KOVAN,
    '0x51ecf6b7831cd141391313ce417f5f50e2a2cadba553562064bcd0e78eed8d7',
    TOKEN0.decimals,
    TOKEN0.symbol,
    TOKEN0.name
  )
}
