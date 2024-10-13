export interface UserReadSerializer {
    id: number;
    username: string;
    user_type: string; 
  }
  
  export interface CreateUserRequest {
    password: string;
    username: string;
  }
  
  export interface CreateUserResponse {
    authentication: {
      access_token: string;
      refresh_token: string;
    };
    user: UserReadSerializer;
  }