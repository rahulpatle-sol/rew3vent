use solana_program::{
    account_info::AccountInfo, entrypoint, entrypoint::ProgramResult, pubkey::Pubkey, msg,
    program_pack::Pack,
};
use borsh::{BorshSerialize, BorshDeserialize};

// Define EventAccount Structure
#[derive(BorshSerialize, BorshDeserialize, Debug)]
pub struct EventAccount {
    pub authority: Pubkey,
    pub name: String,
    pub date: u64,
    pub location: String,
    pub reward_mint: Option<Pubkey>,
}

// Define Event Instructions
pub enum EventInstruction {
    CreateEvent {
        name: String,
        date: u64,
        location: String,
    },
    DistributeReward {
        event_id: Pubkey,
        attendee: Pubkey,
    },
}

// Declare and export the program's entrypoint
entrypoint!(process_instruction);

// Program entrypoint implementation
pub fn process_instruction(
    program_id: &Pubkey,
    accounts: &[AccountInfo],
    instruction_data: &[u8],
) -> ProgramResult {
    msg!("Rew3vent Event Reward Program Entrypoint");
    msg!("Program ID: {}", program_id);
    
    for (i, account) in accounts.iter().enumerate() {
        msg!("Account {}: {} (Owner: {})", i, account.key, account.owner);
    }

    // Deserialize instruction data
    let instruction: EventInstruction = match borsh::try_from_slice(instruction_data) {
        Ok(inst) => inst,
        Err(_) => return Err(solana_program::program_error::ProgramError::InvalidInstructionData),
    };

    match instruction {
        EventInstruction::CreateEvent { name, date, location } => {
            msg!("Creating Event: {}, Date: {}, Location: {}", name, date, location);
        }
        EventInstruction::DistributeReward { event_id, attendee } => {
            msg!("Distributing Reward for Event ID: {} to Attendee: {}", event_id, attendee);
        }
    }

    Ok(())
}
