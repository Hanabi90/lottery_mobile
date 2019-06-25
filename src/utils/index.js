import JsEncrypt from 'jsencrypt'
import md5 from 'js-md5'
//公共key
const public_key = `-----BEGIN PUBLIC KEY-----
                MIGeMA0GCSqGSIb3DQEBAQUAA4GMADCBiAKBgGeBwE0bATN5j/AWlYAiAMRE+6FN
                JGxIXZmW2J7Qks1c+inXB4KQIuXK2a6DLfuGnxRWCTa0XJvHr6vLWvx1J8zVktOq
                1w7tA6yR5iwYfN5vS+aorsI8tcRxuNGpDtJsLS9kINGd7VH2ocmYSv8PDUKZMLqr
                i5Azz9DtRubvoQJFAgMBAAE=
                -----END PUBLIC KEY-----`
// const public_key = `-----BEGIN PUBLIC KEY-----
// MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEA4xKlQqd6KvLKyDto0z94
// nr5E7Njl/Yi0Vk8UTgeFn8THZhaMXA1n0V3uYi+steaUEPxEkvHF4w49eX7omevf
// dprmhEfVdy8oGMNdEkiKvYBHJLGPJ3zG8jenaCf214X6MAn4ne6LWXpw0C013fLj
// yUpK4pSvitCnZGzxnSnTCl6fWjKBKzrxQC0Cs55VhjSXX3N6rDqF+GTWogmLqn3n
// qejxcxvrcTascjrBeItahW9ITvcaQfr7yMpE44zszbBrs0IRuhJa/mEDKLAwfXqa
// oGc3ZOfBVFJ5EQtjN4TI5Q0ihIuNFG0b3sLw23Kb7Vj8r585JclxN+KxDB5reloL
// Io3TESIzlWD4nuIreTZpHOfsceGvRZnDmzh/4apmXiuKi42ZXWEz2dqYu7biTXmW
// +7uY+wK7zRzzXsFk+IgE69/Bak/jSdVWqsOHPBV9nW29DIMVANdjZLW4C9oIzToi
// OZ7cyebauGcEQRDDgyHl18HzeM+zhoyH73B02H2kP4rxR7nSxnUIwe1m5UYYcPry
// ZZLhxs0k74P1hLKjl5mO1ZYaEICdn4KH2Gd6GCw0gum868rfItVC7rcYTPUVvsw5
// sKbH4ddnThRrJIWSkvHB+fj04tQFsZfOVh91MJZtRQSBxQ8RIw+6WjRK9QcnBITo
// RAsCWj/j1goqVyCFSZq0WPMCAwEAAQ==
// -----END PUBLIC KEY-----`
//分段加密
export const RSAencrypt = str => {
    let BLOCK_SIZE = 100,
        jse = new JSEncrypt(),
        ret = '',
        str_1 = ''
    jse.setPublicKey(public_key)
    while (str.length > 0) {
        var i = BLOCK_SIZE
        if (str.length < i) {
            i = str.length
        }
        str_1 = str.substr(0, i)
        str = str.substr(i, str.length - i)
        ret += jse.encrypt(str_1) + ' '
    }
    return ret
}

