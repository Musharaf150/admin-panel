
import AnimatedCounter from './AnimatedCounter';


const TotalBalanceBox = () => {
 

  return (
    <section className='total-balance'>
      <div className='flex flex-col gap-2'>
        <p className='total-balance-label'>
          Total Current Balance
        </p>
        <div className='total-balance-amount flex-center gap-2'>
        <AnimatedCounter amount={Number('0')} />
        </div>
      </div>
    </section>
  );
};

export default TotalBalanceBox;
