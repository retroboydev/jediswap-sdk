import invariant from 'tiny-invariant'
import { ChainId } from '../constants'
import { validateAndParseAddress } from '@jediswap/starknet'
import { Currency } from './currency'
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
    return number.toBN(this.address) < number.toBN(other.address)
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
    '0x178dbb224d42b76d1e4697741c8c43068ced9792bc511941ce865c0fc951369',
    18,
    'TOKEN0',
    'Token 0'
  ),
  [ChainId.MAINNET]: new Token(
    ChainId.MAINNET,
    '0x178dbb224d42b76d1e4697741c8c43068ced9792bc511941ce865c0fc951369',
    18,
    'WETH',
    'Wrapped Ether'
  ),
  [ChainId.ROPSTEN]: new Token(
    ChainId.ROPSTEN,
    '0x178dbb224d42b76d1e4697741c8c43068ced9792bc511941ce865c0fc951369',
    18,
    'WETH',
    'Wrapped Ether'
  ),
  [ChainId.RINKEBY]: new Token(
    ChainId.RINKEBY,
    '0x178dbb224d42b76d1e4697741c8c43068ced9792bc511941ce865c0fc951369',
    18,
    'WETH',
    'Wrapped Ether'
  ),

  [ChainId.KOVAN]: new Token(
    ChainId.KOVAN,
    '0x178dbb224d42b76d1e4697741c8c43068ced9792bc511941ce865c0fc951369',
    18,
    'WETH',
    'Wrapped Ether'
  )
}
