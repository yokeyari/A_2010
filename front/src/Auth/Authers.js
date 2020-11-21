const PERM = {
  ALL: 4,
  OWN: 2,
  NO: 0,
}

class BaseAuther {
  constructor(user, target = null) {
    if (user.workspace_id == "home") {
      user.level = "owner"
    } else {
      user.leel = user.permission
    }
    this.user = user
    this.target = target
    this.setDefault(user);
  }

  setDefault = (user) => {
    switch (user.level) {
      case "owner":
        this.default = {
          read: PERM.ALL, create: PERM.ALL, edit: PERM.ALL, delete: PERM.ALL
        }
        break;
      case "sup":
        this.default = {
          read: PERM.ALL, create: PERM.ALL, edit: PERM.ALL, delete: PERM.ALL
        }
        break;
      case "general":
        this.default = {
          read: PERM.ALL, create: PERM.ALL, edit: PERM.OWN, delete: PERM.OWN
        }
        break;
      case "guest":
      default:
        this.default = {
          read: PERM.ALL, create: PERM.NO, edit: PERM.NO, delete: PERM.NO
        }
    }
  }

  calcAuth = (target, action) => {
    if (target == null) target = this.target;

    if (this.user.id == target.user_id) {
      return this.default[action] >= PERM.OWN
    } else {
      return this.default[action] >= PERM.ALL
    }
  }

  canRead = (target) => {
    return this.calcAuth(target, 'read')
  }
  canCreate = (target) => {
    return this.calcAuth(target, 'create')
  }
  canEdit = (target) => {
    return this.calcAuth(target, 'edit')
  }
  canDelete = (target) => {
    return this.calcAuth(target, 'delete')
  }

  makeAuth = (target) => {
    return {
      canRead: this.canRead(target),
      canCreate: this.canCreate(target),
      canDelete: this.canDelete(target),
      canEdit: this.canEdit(target),
    }
  }

}

class MemoAuther extends BaseAuther {
  constructor(user) {
    super(user);
  }
}

class PageAuther extends BaseAuther {
  constructor(user) {
    super(user);
  }
  canRead = (target) => {
    if(this.user.workspace_id=="home"){
      return (target.workspace_id==null);
    }else{
      return this.calcAuth(target, 'read')
    }
    
  }
}

class WSAuther extends BaseAuther {
  constructor(user) {
    super(user);
  }
}



export { MemoAuther, PageAuther, WSAuther };