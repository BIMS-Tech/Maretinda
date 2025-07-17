export default async function quickTestGiyaPay({ container }: any) {
  const logger = container.resolve("logger")
  
  logger.info('=== Quick GiyaPay Test ===')
  
  try {
    const paymentModuleService = container.resolve("payment")
    logger.info('✅ Payment module resolved')
    
    // Test provider retrieval
    try {
      const giyaPayProvider = await paymentModuleService.retrieveProvider('pp_giyapay')
      logger.info('🎉 SUCCESS: GiyaPay provider found!', !!giyaPayProvider)
      return true
    } catch (error) {
      logger.error('❌ GiyaPay provider not found:', error.message)
      return false
    }
    
  } catch (error) {
    logger.error('Error in quick test:', error)
    return false
  }
} 